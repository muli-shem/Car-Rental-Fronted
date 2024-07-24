import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Vehicle, VehicleSpecifications } from './allvehiclespcisAPI';

interface EditVehicleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  vehicle: Vehicle;
  onUpdate: (vehicle: Partial<Vehicle>) => void;
}

const EditVehicleModal: React.FC<EditVehicleModalProps> = ({ isOpen, closeModal, vehicle, onUpdate }) => {
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    ...vehicle,
    VehicleSpecifications: vehicle.VehicleSpecifications || {} // Initialize if undefined
  });

  useEffect(() => {
    setFormData({
      ...vehicle,
      VehicleSpecifications: vehicle.VehicleSpecifications || {} // Initialize if undefined
    }); // Update form data when vehicle prop changes
  }, [vehicle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('VehicleSpecifications.')) {
      const specKey = name.replace('VehicleSpecifications.', '') as keyof VehicleSpecifications;

      setFormData(prev => ({
        ...prev,
        VehicleSpecifications: {
          ...(prev.VehicleSpecifications as VehicleSpecifications), // Type assertion here
          [specKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Edit Vehicle
                </Dialog.Title>
                <div className="mt-2">
                  <form>
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="text"
                        name="rental_rate"
                        value={formData.rental_rate || ''}
                        onChange={handleChange}
                        placeholder="Rental Rate"
                        className="input input-bordered"
                      />
                      <input
                        type="text"
                        name="VehicleSpecifications.manufacturer"
                        value={formData.VehicleSpecifications?.manufacturer || ''}
                        onChange={handleChange}
                        placeholder="Manufacturer"
                        className="input input-bordered"
                      />
                      <input
                        type="text"
                        name="VehicleSpecifications.model"
                        value={formData.VehicleSpecifications?.model || ''}
                        onChange={handleChange}
                        placeholder="Model"
                        className="input input-bordered"
                      />
                      <input
                        type="number"
                        name="VehicleSpecifications.year"
                        value={formData.VehicleSpecifications?.year || ''}
                        onChange={handleChange}
                        placeholder="Year"
                        className="input input-bordered"
                      />
                      <input
                        type="text"
                        name="VehicleSpecifications.fuel_type"
                        value={formData.VehicleSpecifications?.fuel_type || ''}
                        onChange={handleChange}
                        placeholder="Fuel Type"
                        className="input input-bordered"
                      />
                      <input
                        type="text"
                        name="VehicleSpecifications.engine_capacity"
                        value={formData.VehicleSpecifications?.engine_capacity || ''}
                        onChange={handleChange}
                        placeholder="Engine Capacity"
                        className="input input-bordered"
                      />
                      <input
                        type="text"
                        name="VehicleSpecifications.transmission"
                        value={formData.VehicleSpecifications?.transmission || ''}
                        onChange={handleChange}
                        placeholder="Transmission"
                        className="input input-bordered"
                      />
                      <input
                        type="number"
                        name="VehicleSpecifications.seating_capacity"
                        value={formData.VehicleSpecifications?.seating_capacity || ''}
                        onChange={handleChange}
                        placeholder="Seating Capacity"
                        className="input input-bordered"
                      />
                      <input
                        type="text"
                        name="VehicleSpecifications.color"
                        value={formData.VehicleSpecifications?.color || ''}
                        onChange={handleChange}
                        placeholder="Color"
                        className="input input-bordered"
                      />
                      <input
                        type="text"
                        name="VehicleSpecifications.features"
                        value={formData.VehicleSpecifications?.features || ''}
                        onChange={handleChange}
                        placeholder="Features"
                        className="input input-bordered"
                      />
                    </div>
                  </form>
                </div>

                <div className="mt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
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

export default EditVehicleModal;
