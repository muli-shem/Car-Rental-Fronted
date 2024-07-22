import { useState } from 'react';
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation, useDisableUserMutation, useAddUserMutation } from './userAPI';
import { Toaster, toast } from 'sonner';
import { TUser } from './userAPI';
import EditUserModal from './EditUserModal';
import AddUserModal from './AddUserModal'; // Import the AddUserModal component

const UserTable = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [disableUser] = useDisableUserMutation();
  const [addUser] = useAddUserMutation();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false); // State for AddUserModal
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  const handleDelete = async (user_id: number) => {
    try {
      await deleteUser(user_id).unwrap();
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  const handleDisable = async (user_id: number) => {
    try {
      await disableUser(user_id).unwrap();
      toast.success('User disabled successfully');
    } catch (error) {
      toast.error('Error disabling user');
    }
  };

  const handleUpdate = async (updatedUser: TUser) => {
    const { user_id, ...patch } = updatedUser;
  
    if (!user_id) {
      toast.error('User ID is missing');
      return;
    }
  
    // Ensure all required fields are present
    if (!patch.email || !patch.contact_phone || !patch.address || !patch.role || !patch.Full_name) {
      toast.error('All required fields must be filled');
      return;
    }
  
    try {
      await updateUser({ user_id, ...patch }).unwrap();
      toast.success('User updated successfully');
    } catch (error) {
      toast.error('Error updating user');
      console.error('Update user error:', error);
    }
  };

  const handleAddUser = async (newUser: Omit<TUser, 'user_id'>) => {
    try {
      await addUser(newUser).unwrap();
      toast.success('User added successfully');
      setAddModalOpen(false); // Close the modal after adding
    } catch (error) {
      toast.error('Error adding user');
    }
  };

  const openEditModal = (user: TUser) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="overflow-x-auto text-base-content bg-gray-100 rounded-lg p-4">
        <h1 className="text-xl my-4">Users Data</h1>
        <button
          className="btn btn-primary mb-4"
          onClick={openAddModal}
        >
          Add New User
        </button>
        <table className="table table-xs">
          <thead className="bg-gray-300">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={7}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7}>No Data</td>
              </tr>
            ) : (
              users &&
              users.map((user: TUser) => (
                <tr key={user.user_id} className="hover:bg-gray-200">
                  <td>{user.user_id}</td>
                  <td>{user.Full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact_phone}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() => openEditModal(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-warning"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-secondary"
                      onClick={() => handleDisable(user.user_id)}
                    >
                      Disable
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="bg-gray-300">
            <tr>
              <td colSpan={7}>{users ? `${users.length} records` : '0 records'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          closeModal={closeEditModal}
          user={selectedUser}
          onUpdate={handleUpdate}
        />
      )}
      <AddUserModal
        isOpen={isAddModalOpen}
        closeModal={closeAddModal}
        onAddUser={handleAddUser}
      />
    </>
  );
};

export default UserTable;
