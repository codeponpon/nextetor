import React, { useContext, useState } from "react";
import { BarsOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Button, Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { User } from "@/generated/client";
import { AbilityContext } from "@/components/Can";

interface iProps {
  record: User;
  onMenuClick: (e: MenuInfo) => void;
  menuOptions: { key: any; name: string }[];
  buttonStyle?: object;
  dropdownProps?: object;
}

const DropOption: React.FC<iProps> = ({
  record,
  onMenuClick,
  menuOptions = [{ key: 0, name: "" }],
  buttonStyle,
  dropdownProps,
}) => {
  const ability = useContext(AbilityContext);
  const menu = menuOptions.map((item) => {
    const menu = [];
    if (item.key === 1) {
      menu.push(
        <Menu.Item key={item.key} disabled={!ability.can("update", record)}>
          {item.name}
        </Menu.Item>
      );
    }

    if (item.key === 2) {
      menu.push(
        <Menu.Item key={item.key} disabled={!ability.can("delete", record)}>
          {item.name}
        </Menu.Item>
      );
    }

    return menu;
  });

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
