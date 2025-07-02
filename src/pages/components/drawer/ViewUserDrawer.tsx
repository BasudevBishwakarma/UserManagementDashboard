import React from "react";
import { Drawer, Avatar, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { UserFormValues } from "../modal/AddUserModal";

interface ViewUserDrawerProps {
  open: boolean;
  onClose: () => void;
  user?: UserFormValues;
}

const ViewUserDrawer: React.FC<ViewUserDrawerProps> = ({
  open,
  onClose,
  user,
}) => {
  return (
    <Drawer
      width={480}
      placement="right"
      closable
      onClose={onClose}
      open={open}
      title="User Details"
    >
      {user ? (
        <div className="flex flex-col items-center gap-[20px]">
          <Avatar
            size={100}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#87d068" }}
          />
          <Descriptions
            bordered
            column={1}
            size="middle"
            labelStyle={{ fontWeight: 600 }}
          >
            <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Company">
              {user.company}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ) : (
        <p>No user selected</p>
      )}
    </Drawer>
  );
};

export default ViewUserDrawer;
