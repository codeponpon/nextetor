import React, { createRef } from "react";

import { Form, Input, Modal, FormInstance, Select, message } from "antd";
import {
  ConfigStatus,
  CreateWebsiteInput,
  RolesDocument,
  Website,
} from "@/generated/client";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import AuthStorage from "@/utils/auth-storage";
import { startCase } from "lodash";
import { $enum } from "ts-enum-util";

export interface IWebsiteModalProps {
  action?: string;
  item?: Website | CreateWebsiteInput;
  visible: boolean;
  destroyOnClose: boolean;
  maskClosable: boolean;
  confirmLoading: boolean;
  title: string;
  centered: boolean;
  onOk: (data: any) => void;
  onCancel: () => void;
}

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export const WebsiteModal: React.FC<IWebsiteModalProps> = (props) => {
  const currentRole = AuthStorage.role;
  const { item, onOk, action, ...modalProps } = props;
  const { data, loading } = useQuery(RolesDocument);
  const formRef = createRef<FormInstance>();

  const roles = loading ? [] : data.roles;
  const handleOk = () => {
    formRef.current
      ?.validateFields()
      .then((values: any) => {
        if (action === "view") return modalProps.onCancel();
        const data = {
          ...values,
        };
        onOk(data);
        message.loading({ content: "Loading...", key: "updatable" });
        setTimeout(() => {
          message.success({
            content: "Done!",
            key: "updatable",
            duration: 2,
          });
        }, 1000);
      })
      .catch((errorInfo: any) => {
        console.log("ERROR Info: ", errorInfo);
      });
  };

  return (
    <Modal {...modalProps} onOk={handleOk}>
      <Form
        ref={formRef}
        name="control-ref"
        initialValues={{ ...item }}
        layout="horizontal"
      >
        {action === "update" && (
          <FormItem name="id" style={{ display: "none" }}>
            <Input type="hidden" />
          </FormItem>
        )}
        {action === "update" && (
          <FormItem name="updatedAt" style={{ display: "none" }}>
            <Input type="hidden" value={dayjs().format()} />
          </FormItem>
        )}
        {action === "update" && item?.maintenance && (
          <FormItem
            name={["maintenance", "updatedAt"]}
            style={{ display: "none" }}
          >
            <Input type="hidden" value={dayjs().format()} />
          </FormItem>
        )}
        <FormItem name="userId" style={{ display: "none" }}>
          <Input type="hidden" />
        </FormItem>
        <FormItem
          name="name"
          label="name"
          hasFeedback
          {...formItemLayout}
          rules={[{ required: true }]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="subdomain"
          label="subdomain"
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem name="domain" label="domain" hasFeedback {...formItemLayout}>
          <Input />
        </FormItem>
        <FormItem name="status" label="status" hasFeedback {...formItemLayout}>
          <Select placeholder={`Please select status`}>
            {$enum(ConfigStatus).map((status: string) => (
              <Option key={status} value={status}>
                {startCase(status)}
              </Option>
            ))}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};
