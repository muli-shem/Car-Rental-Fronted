import { useState } from 'react';
import { TUser } from './userAPI'; 
interface AddUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onAddUser: (newUser: Omit<TUser, 'user_id'>) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, closeModal, onAddUser }) => {
  const [newUser, setNewUser] = useState<Omit<TUser, 'user_id'>>({
    Full_name: '',
    email: '',
    contact_phone: '',
    address: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddUser(newUser);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl">Add New User</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="Full_name"
            value={newUser.Full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="text"
            name="contact_phone"
            value={newUser.contact_phone}
            onChange={handleChange}
            placeholder="Phone"
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="text"
            name="address"
            value={newUser.address}
            onChange={handleChange}
            placeholder="Address"
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="text"
            name="role"
            value={newUser.role}
            onChange={handleChange}
            placeholder="Role"
            className="input input-bordered w-full mb-2"
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Add User</button>
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
