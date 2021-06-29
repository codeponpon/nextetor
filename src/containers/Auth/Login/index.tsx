import React, { useState } from "react";
import Link from "next/link";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "@/components/Layout/Logo";
import classes from "./style.module.less";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = () => {};

  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <div className={classes.leftOverlay} />
        <div className={classes.leftContent}>
          <Logo width={150} height={150} />
          <div className="ml-4 flex-1">
            <h1 className="pt-0 text-white">Nextetor</h1>
            <p className="">Description</p>
          </div>
        </div>
      </div>
      <div className={classes.right}>
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
              padding: 20,
              margin: "0 auto 40px",
              borderRadius: 4,
              background: "#fff",
            }}
            size="large"
          >
            <div className="text-center mb-5">
              <Logo width={150} height={150} />
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <div className="text-center">
                <Link href="/forgot-password">
                  <a className="login-form-forgot">Forgot password</a>
                </Link>
              </div>
            </Form.Item>

            <Button
              type="primary"
              block
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Login
            </Button>

            {/* <div className="mt-5">
              <div className="class">Email: admin@gmail.com</div>
              <div className="class">Password: admin123</div>
            </div> */}
          </Form>
        </div>
        <div className="py-2">
          <strong className="text-primary">Nextetor</strong>
          <span> 2017 © All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
