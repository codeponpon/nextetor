import React from "react";
import { BarsOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Button, Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";

interface iProps {
  onMenuClick: (e: MenuInfo) => void;
  menuOptions: { key: any; name: string }[];
  buttonStyle?: object;
  dropdownProps?: object;
}

const DropOption: React.FC<iProps> = ({
  onMenuClick,
  menuOptions = [{ key: 0, name: "" }],
  buttonStyle,
  dropdownProps,
}) => {
  const menu = menuOptions.map((item) => (
    <Menu.Item key={item.key}>{item.name}</Menu.Item>
  ));
  return (
    <Dropdown
      overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
      {...dropdownProps}
    >
      <Button style={{ border: "none", ...buttonStyle }}>
        <BarsOutlined style={{ marginRight: 2 }} />
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropOption;
