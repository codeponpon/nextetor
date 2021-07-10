import React, { createRef } from "react";

import {
  Form,
  Input,
  Modal,
  FormInstance,
  Card,
  Select,
  DatePicker,
} from "antd";
import { RolesDocument, RoleType, User, UserStatus } from "@/generated/client";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import { startCase, toLower } from "lodash";
import AuthStorage from "@/utils/auth-storage";
import moment from "moment";
import { $enum } from "ts-enum-util";

export interface IModalProps {
  item?: User;
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

export const UserModal: React.FC<IModalProps> = (props) => {
  const currentRole = AuthStorage.role;
  const { item, onOk, ...modalProps } = props;
  const { data, loading } = useQuery(RolesDocument);
  const formRef = createRef<FormInstance>();

  const roles = loading ? [] : data.roles;
  const handleOk = () => {
    formRef.current
      ?.validateFields()
      .then((values: any) => {
        const data = {
          ...values,
        };
        onOk(data);
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
        <FormItem name="id" style={{ display: "none" }}>
          <Input type="hidden" />
        </FormItem>
        <FormItem name="updatedAt" style={{ display: "none" }}>
          <Input type="hidden" value={dayjs().format()} />
        </FormItem>
        <FormItem name={["profile", "updatedAt"]} style={{ display: "none" }}>
          <Input type="hidden" value={dayjs().format()} />
        </FormItem>
        <FormItem name={["profile", "id"]} style={{ display: "none" }}>
          <Input type="hidden" />
        </FormItem>
        <FormItem
          name="username"
          rules={[{ required: true }]}
          label={`Username`}
          hasFeedback
          {...formItemLayout}
        >
          <Input disabled={true} />
        </FormItem>
        <FormItem
          name="roleId"
          label="Role"
          rules={[{ required: true }]}
          hasFeedback
          {...formItemLayout}
        >
          <Select placeholder={`Please select a role ${item!.roleId}`}>
            {roles.map((role: any) => (
              <Option
                key={role.id}
                value={role.id}
                disabled={role.name === toLower(RoleType.SuperAdmin)}
              >
                {startCase(role.name)}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          name="status"
          label="Status"
          rules={[{ required: true }]}
          hasFeedback
          {...formItemLayout}
        >
          <Select placeholder={`Please select a status`}>
            {$enum(UserStatus).map((status: string) => (
              <Option key={status} value={status}>
                {startCase(status)}
              </Option>
            ))}
          </Select>
        </FormItem>
        <Card title="Profile" bordered={false}>
          <FormItem
            name={["profile", "firstName"]}
            rules={[{ required: true }]}
            label={`First Name`}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            name={["profile", "lastName"]}
            rules={[{ required: true }]}
            label={`Last Name`}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            name={["profile", "lineID"]}
            label={`Line ID`}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            name="birthday"
            initialValue={
              item?.profile?.birthday ? moment(item?.profile?.birthday) : null
            }
            label={`Birth Date`}
            {...formItemLayout}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={(current) => {
                return dayjs().add(-18, "years") <= current;
              }}
            />
          </FormItem>
          <FormItem
            name={["profile", "mobile"]}
            rules={[
              {
                required: true,
                pattern: /^0\d{9}$/,
                message: `The input is not valid phone!`,
              },
            ]}
            label={`Mobile`}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            name={["profile", "email"]}
            rules={[
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: `The input is not valid E-mail!`,
              },
            ]}
            label={`Email`}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
        </Card>
      </Form>
    </Modal>
  );
};
