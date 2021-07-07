import React, { createRef } from "react";

import {
  Form,
  Input,
  Modal,
  Cascader,
  DatePicker,
  FormInstance,
  Card,
  Select,
} from "antd";
import { Role, RolesDocument, User } from "@/generated/client";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import { startCase } from "lodash";

export interface IModalProps {
  item: User;
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

  console.log("ITEM: ", item);

  return (
    <Modal {...modalProps} onOk={handleOk}>
      <Form
        ref={formRef}
        name="control-ref"
        initialValues={{ ...item }}
        layout="horizontal"
      >
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
          <Select placeholder={`Please select a role ${item.roleId}`}>
            {roles.map((role: any) => (
              <Option key={role.id} value={role.id}>
                {startCase(role.name)}
              </Option>
            ))}
          </Select>
        </FormItem>
        <Card title="Profile" bordered={false}>
          <FormItem
            name="firstName"
            rules={[{ required: true }]}
            label={`First Name`}
            initialValue={item?.profile?.firstName}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            name="lastName"
            rules={[{ required: true }]}
            label={`Last Name`}
            initialValue={item?.profile?.lastName}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            name="lineId"
            rules={[{ required: true }]}
            label={`Line ID`}
            initialValue={item?.profile?.lineID}
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            name="birthday"
            rules={[{ required: true }]}
            label={`Birth Date`}
            initialValue={dayjs(item?.profile?.birthday)}
            hasFeedback
            {...formItemLayout}
          >
            <DatePicker format="YYYY-MM-DD" />
          </FormItem>
          <FormItem
            name="mobile"
            initialValue={item?.profile?.mobile}
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
            name="email"
            initialValue={item?.profile?.email}
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
