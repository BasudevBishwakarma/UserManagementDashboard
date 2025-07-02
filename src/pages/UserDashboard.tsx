import { UserAddOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import AppTable from "../components/table";
import { useUserColumns } from "./components/columns/useUserColumn";
import { useMemo, useState } from "react";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../service/users/usersApi";
import AddUserModal, {
  type UserFormValues,
} from "./components/modal/AddUserModal";
import Search from "../components/table/FilterSearch";
import DeleteConfirmModal from "../components/modal/DeleteModal";
import ViewUserDrawer from "./components/drawer/ViewUserDrawer";

const UserDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedDeleteUserId, setSelectedDeleteUserId] = useState<
    number | null
  >(null);

  const [messageApi, contextHolder] = message.useMessage();

  const { data: users, isLoading } = useGetUsersQuery();
  const { data: usersById } = useGetUserByIdQuery(userId!, {
    skip: userId === null,
  });
  const [addUser, { isLoading: createUserLoading }] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  function onDelete(data: UserFormValues) {
    setSelectedDeleteUserId(data?.id);
    setDeleteModalOpen(true);
  }

  function onEdit(data: UserFormValues) {
    setUserId(data?.id);
    setModalOpen(true);
  }

  function onView(data: UserFormValues) {
    setUserId(data?.id);
    setViewModalOpen(true);
  }

  const columns = useUserColumns({ onDelete, onEdit, onView });

  const filteredData = useMemo(() => {
    if (!search?.trim()) return users;
    return users?.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const handleSubmit = async (data: UserFormValues) => {
    try {
      if (!userId) {
        await addUser(data).unwrap();
        // await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        //   title: data?.name,
        // });
        messageApi.success("User added successfully!");
      } else {
        await updateUser({ id: userId, data }).unwrap();
        messageApi.success("User updated successfully!");
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Add user error:", error);
      messageApi.error("Failed to add user.");
    }
  };

  const handleDeleteUser = async () => {
    if (selectedDeleteUserId === null) return;
    try {
      await deleteUser(selectedDeleteUserId).unwrap();
      messageApi.success("User deleted successfully!");
      setDeleteModalOpen(false);
      setUserId(null);
    } catch (error) {
      console.error("Delete error:", error);
      messageApi.error("Failed to delete user.");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="mt-5 space-y-[12px]">
        <div className="flex justify-between items-center">
          <Search onSearch={setSearch} placeholder="Search..." />
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            className="w-[148px]"
            style={{ height: 44 }}
            htmlType="button"
            onClick={() => setModalOpen(true)}
          >
            Add User
          </Button>
        </div>
        <div className="">
          <AppTable
            columns={columns}
            dataSource={filteredData}
            loading={isLoading}
            rowKey="id"
            pagination={{
              pageSize: 9,
              showSizeChanger: false,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </div>
      </div>
      <AddUserModal
        title={!userId ? "Add User" : "Edit User"}
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={createUserLoading}
        setUserId={setUserId}
        userId={userId}
        initialValues={usersById}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setUserId(null);
        }}
        onConfirm={handleDeleteUser}
        itemName="user"
      />
      <ViewUserDrawer
        onClose={() => {
          setViewModalOpen(false);
          setUserId(null);
        }}
        open={isViewModalOpen}
        user={usersById}
      />
    </>
  );
};

export default UserDashboard;
