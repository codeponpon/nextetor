import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "@/components/Layout/Logo";
import classes from "./style.module.less";
import AuthStorage from "@/utils/auth-storage";
import { ActionType, ILogin } from "@/redux/actions/types";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const SIGN_IN = gql`
  mutation SingIn($input: SignInInput!) {
    signIn(input: $input) {
      id
      token
      profile {
        firstName
        lastName
        email
      }
      role {
        name
        type
      }
    }
  }
`;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [signIn, { loading }] = useMutation(SIGN_IN);
  const router = useRouter();

  useEffect(() => {
    if (AuthStorage.loggedIn) {
      router.push("/");
    }
  }, []);

  const onFinish = async (values: ILogin) => {
    try {
      const { data } = await signIn({ variables: { input: values } });
      const user = data?.signIn;
      if (!loading) {
        AuthStorage.value = {
          userId: user.id,
          token: user.token,
          role: user.role.name,
          user: user,
        };
        router.push("/");
      }
    } catch (error) {
      await dispatch({
        type: ActionType.REQUEST_ERROR,
        payload: error,
      });
    }
  };

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
              name="username"
              rules={[
                {
                  type: "string",
                  message: "The input is not valid Username",
                },
                {
                  required: true,
                  message: "Please input your Username",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
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
