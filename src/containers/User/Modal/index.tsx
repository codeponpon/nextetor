import React, { createRef } from "react";

import {
  Form,
  Input,
  Modal,
  FormInstance,
  Card,
  Select,
  DatePicker,
  message,
} from "antd";
import {
  CreateUserInput,
  RolesDocument,
  RoleType,
  User,
  UserStatus,
} from "@/generated/client";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import { startCase, toLower } from "lodash";
import AuthStorage from "@/utils/auth-storage";
import moment from "moment";
import { $enum } from "ts-enum-util";

export interface IModalProps {
  action?: string;
  item?: User | CreateUserInput;
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
        {action === "update" && (
          <FormItem name={["profile", "updatedAt"]} style={{ display: "none" }}>
            <Input type="hidden" value={dayjs().format()} />
          </FormItem>
        )}
        {action === "update" && (
          <FormItem name={["profile", "id"]} style={{ display: "none" }}>
            <Input type="hidden" />
          </FormItem>
        )}
        <FormItem name="createdBy" style={{ display: "none" }}>
          <Input type="hidden" />
        </FormItem>
        <FormItem
          name="username"
          rules={[{ required: true }]}
          label={`Username`}
          hasFeedback
          {...formItemLayout}
        >
          <Input disabled={action !== "create"} />
        </FormItem>
        {action === "create" && (
          <FormItem
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { min: 6, message: "Password must be minimum 6 characters." },
            ]}
            hasFeedback
            {...formItemLayout}
          >
            <Input.Password />
          </FormItem>
        )}
        {action === "create" && (
          <FormItem
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </FormItem>
        )}
        <FormItem
          name="roleId"
          label="Role"
          rules={[{ required: true }]}
          hasFeedback
          {...formItemLayout}
        >
          <Select
            placeholder={`Please select a role ${item!.roleId}`}
            disabled={action === "view"}
          >
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
          <Select
            placeholder={`Please select a status`}
            disabled={action === "view"}
          >
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
            <Input disabled={action === "view"} />
          </FormItem>
          <FormItem
            name={["profile", "lastName"]}
            rules={[{ required: true }]}
            label={`Last Name`}
            hasFeedback
            {...formItemLayout}
          >
            <Input disabled={action === "view"} />
          </FormItem>
          <FormItem
            name={["profile", "lineID"]}
            label={`Line ID`}
            hasFeedback
            {...formItemLayout}
          >
            <Input disabled={action === "view"} />
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
              disabled={action === "view"}
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
            <Input disabled={action === "view"} />
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
            <Input disabled={action === "view"} />
          </FormItem>
        </Card>
      </Form>
    </Modal>
  );
};
