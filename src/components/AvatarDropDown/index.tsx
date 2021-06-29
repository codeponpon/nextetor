/* eslint-disable no-console */
import React from "react";

import { Menu, Dropdown, Modal } from "antd";

import Router from "next/router";
import Link from "next/link";

import { BiKey } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";

import { ExclamationCircleOutlined } from "@ant-design/icons";

import Avatar from "@/components/Avatar";

import classes from "./style.module.less";

interface IProps {
  style: object;
}

const AvatarDropDown: React.FC<IProps> = ({ style }: IProps) => {
  const { paymentDetail: { paid } = {} } = {};

  const handleLogout = React.useCallback(async () => {
    Modal.confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Are you sure?',
      onOk: async () => {
        Router.push("/login");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }, []);

  const fullName = "cPP";
  const avatar = "https://i.pravatar.cc/150?img=37";
  const email = "cpp@example.com";
  const menu = (
    <Menu className={classes.menuDropdown}>
      <div className={classes.name}>
        <Avatar size={50} src={avatar} fullName={fullName} vip={paid} />
        <div className={classes.fullName}>
          <strong>{fullName}</strong>
          <div className="text-small">{email}</div>
        </div>
      </div>
      <Menu.Divider />
      {/* <Menu.Item>
				<Link href="/profile">
					<a className={classes.item}>
						<FiUser />
						<span>Profile</span>
					</a>
				</Link>
			</Menu.Item> */}
      <Menu.Item key="change">
        <Link href="/change-password">
          <a className={classes.item}>
            <BiKey />
            <span>Change password</span>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <a className={classes.item} onClick={handleLogout}>
          <AiOutlineLogout />
          <span>Logout</span>
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown style={style} overlay={menu} trigger={["click"]}>
      <div style={{ lineHeight: "50px" }}>
        <Avatar
          size={30}
          src={avatar}
          fullName={fullName}
          style={{
            cursor: "pointer",
          }}
          vip={paid}
        />
      </div>
    </Dropdown>
  );
};

export default AvatarDropDown;
