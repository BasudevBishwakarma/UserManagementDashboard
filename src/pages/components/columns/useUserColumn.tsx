import { Button, Dropdown } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
}

interface UseUserColumnsProps {
  onEdit: (user: User) => void;
  onView: (user: User) => void;
  onDelete: (user: User) => void;
}

export const useUserColumns = ({
  onEdit,
  onDelete,
  onView,
}: UseUserColumnsProps): ColumnsType<User> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
  },
  {
    key: "actions",
    width: 76,
    render: (_, record) => {
      const menuItems = [
        {
          key: "edit",
          label: "Edit",
          icon: <EditOutlined />,
          onClick: () => onEdit(record),
        },
        {
          key: "view",
          label: "View",
          icon: <EyeOutlined />,
          onClick: () => onView(record),
        },
        {
          key: "delete",
          label: "Delete",
          icon: <DeleteOutlined />,
          danger: true,
          onClick: () => onDelete(record),
        },
      ];

      return (
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      );
    },
  },
];
