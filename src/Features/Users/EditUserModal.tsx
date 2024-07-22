import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { TUser } from './userAPI';

interface EditUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user: TUser;
  onUpdate: (user: TUser) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, closeModal, user, onUpdate }) => {
  const [formData, setFormData] = useState<TUser>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Edit User
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Full_name"
                    value={formData.Full_name || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="contact_phone"
                    value={formData.contact_phone || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-2"
                    placeholder="Role"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditUserModal;
