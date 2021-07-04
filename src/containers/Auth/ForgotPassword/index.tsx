import React, { useState } from "react";

import useAsync from "react-use/lib/useAsync";

import AuthStorage from "@/utils/auth-storage";
import Link from "next/link";

import Image from "next/image";

import { Form, Input, Button } from "antd";
import { PhoneOutlined, FieldNumberOutlined } from "@ant-design/icons";

import classes from "./style.module.less";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [validOTP, setValidOTP] = useState(false);

  useAsync(async () => {
    if (AuthStorage.loggedIn) {
      // Logout
    }
  }, []);

  const onFinish = () => {
    setSent(true);
  };

  const onFinishOtp = () => {
    setValidOTP(true);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  if (validOTP) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.leftOverlay} />
          <div className={classes.leftContent}>
            <div className="d-flex justify-content-center align-content-center flex-1 flex-column">
              <Form
                {...formItemLayout}
                form={form}
                name="reset-password"
                onFinish={onFinish}
                scrollToFirstError
                style={{
                  width: 350,
                  margin: "0 auto 40px",
                  borderRadius: 4,
                  background: "#fff",
                  padding: "40px 20px",
                  color: "#000",
                }}
              >
                <div className="text-center mb-5">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={150}
                    height={150}
                  />
                </div>

                <p className="text-center mt-3 text-black">
                  Please enter password and password confirmation.
                </p>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
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
                </Form.Item>

                <div className="text-center">
                  <Link href="/login">
                    <Button type="primary" className="mt-3" loading={loading}>
                      Submit
                    </Button>
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (sent) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.leftOverlay} />
          <div className={classes.leftContent}>
            <div className="d-flex justify-content-center align-content-center flex-1 flex-column">
              <Form
                name="normal_otp"
                className="otp-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinishOtp}
                style={{
                  width: 350,
                  margin: "0 auto 40px",
                  borderRadius: 4,
                  background: "#fff",
                  padding: "40px 20px",
                }}
                size="large"
              >
                <div className="text-center mb-5">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={150}
                    height={150}
                  />
                </div>

                <p className="text-center mt-3 text-black">
                  An OTP has been sent to your mobile number. Please fill in an
                  OTP within 5 minutes to reset your password.
                </p>

                <Form.Item
                  name="otp"
                  label="OTP"
                  rules={[
                    {
                      required: true,
                      message: "Please input the OTP number",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <FieldNumberOutlined className="site-form-item-icon" />
                    }
                    placeholder="000000"
                    maxLength={6}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  className="otp-form-button"
                  loading={loading}
                >
                  Submit OTP
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <div className={classes.leftOverlay} />
        <div className={classes.leftContent}>
          <div className="d-flex justify-content-center align-content-center flex-1 flex-column">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              style={{
                width: 350,
                margin: "0 auto 40px",
                borderRadius: 4,
                background: "#fff",
                padding: "40px 20px",
              }}
              size="large"
            >
              <div className="text-center mb-5">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={150}
                  height={150}
                />
              </div>
              <p className="text-center mb-3">
                Enter your mobile number. We will send you a OTP for you to
                reset your password.
              </p>

              <Form.Item
                name="phone"
                label="Mobile"
                rules={[
                  {
                    required: true,
                    message: "Please input your mobile number!",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="0987654321"
                />
              </Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Reset
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
