import { Button, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";

export interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  id: number;
}

interface UserFromProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (val: UserFormValues) => void;
  initialValues?: Partial<UserFormValues>;
  title: string;
  isLoading?: boolean;
  userId: number | null;
  setUserId: (val: number | null) => void;
  usersById?: UserFormValues;
}

const AddUserModal: React.FC<UserFromProps> = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  title,
  isLoading,
  setUserId,
  userId,
}) => {
  const [form] = Form.useForm<UserFormValues>();
  const { resetFields, setFieldsValue } = form;

  useEffect(() => {
    if (initialValues && userId) {
      setFieldsValue(initialValues);
    } else {
      resetFields();
    }
  }, [initialValues, userId]);

  const handleCancel = () => {
    onCancel();
    resetFields();
    setUserId(null);
  };

  const handleFinish = (values: UserFormValues) => {
    onSubmit(values);
    resetFields();
    setUserId(null);
  };

  return (
    <Modal
      open={open}
      title={title}
      onCancel={handleCancel}
      footer={null}
      confirmLoading={isLoading}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input placeholder="Enter phone number " />
        </Form.Item>

        <Form.Item
          label="Company Name"
          name="company"
          rules={[{ required: true, message: "Comapny name is required." }]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>

        <div className="flex justify-end gap-[8px] mt-4">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {userId ? "Update" : "Submit"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
