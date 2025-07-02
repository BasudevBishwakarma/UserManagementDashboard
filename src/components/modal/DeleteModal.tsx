import { Modal } from "antd";
import React from "react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  itemName?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  itemName,
}) => {
  return (
    <Modal
      title="Confirm Deletion"
      open={isOpen}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Delete"
      okType="danger"
      cancelText="Cancel"
      centered
    >
      <p>
        Are you sure you want to delete this{" "}
        <strong> {itemName || "item"}</strong>?
      </p>
    </Modal>
  );
};

export default DeleteConfirmModal;
