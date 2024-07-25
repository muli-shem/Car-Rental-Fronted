import React, { useState } from 'react';
import { Vehicle, VehicleSpecifications } from './allvehiclespcisAPI'; // Import the Vehicle and VehicleSpecifications types

interface CreateVehicleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onCreate: (newVehicle: Partial<Vehicle>, vehicleSpecifications: Partial<VehicleSpecifications>) => void;
}

const CreateVehicleModal: React.FC<CreateVehicleModalProps> = ({ isOpen, closeModal, onCreate }) => {
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    rental_rate: '',
    availability: true,
  });

  const [vehicleSpecifications, setVehicleSpecifications] = useState<Partial<VehicleSpecifications>>({
    manufacturer: '',
    model: '',
    year: undefined,
    fuel_type: '',
    engine_capacity: '',
    transmission: '',
    seating_capacity: undefined,
    color: '',
    features: ''
  });

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      setNewVehicle(prev => ({ ...prev, [name]: checked }));
    } else {
      setNewVehicle(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSpecificationsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'number') {
      setVehicleSpecifications(prev => ({
        ...prev,
        [name]: value ? parseInt(value, 10) : undefined
      }));
    } else {
      setVehicleSpecifications(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const updatedSpecifications: Partial<VehicleSpecifications> = {
      ...vehicleSpecifications,
      year: typeof vehicleSpecifications.year === 'string' ? parseInt(vehicleSpecifications.year, 10) : vehicleSpecifications.year,
      seating_capacity: typeof vehicleSpecifications.seating_capacity === 'string' ? parseInt(vehicleSpecifications.seating_capacity, 10) : vehicleSpecifications.seating_capacity
    };

    onCreate(newVehicle, updatedSpecifications);
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg mx-2">
          <h2 className="text-lg mb-3 font-semibold">Create New Vehicle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Rental Rate</label>
              <input
                type="text"
                name="rental_rate"
                value={newVehicle.rental_rate || ''}
                onChange={handleVehicleChange}
                className="w-full p-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Availability</label>
              <input
                type="checkbox"
                name="availability"
                checked={newVehicle.availability || false}
                onChange={handleVehicleChange}
                className="mr-2"
              />
            </div>
          </div>

          <h3 className="text-md mb-2 font-semibold">Vehicle Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={vehicleSpecifications.manufacturer || ''}
                onChange={handleSpecificationsChange}
                className="w-full p-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Model</label>
              <input
                type="text"
                name="model"
                value={vehicleSpecifications.model || ''}
                onChange={handleSpecificationsChange}
                className="w-full p-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Year</label>
              <input
                type="number"
                name="year"
                value={vehicleSpecifications.year || ''}
                onChange={handleSpecificationsChange}
                className="w-full p-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Fuel Type</label>
              <input
                type="text"
                name="fuel_type"
                value={vehicleSpecifications.fuel_type || ''}
                onChange={handleSpecificationsChange}
                className="w-full p-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Engine Capacity</label>
              <input
                type="text"
                name="engine_capacity"
                value={vehicleSpecifications.engine_capacity || ''}
                onChange={handleSpecificationsChange}
                className="w-full p-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Transmission</label>
              <input
                type="text"
                name="transmission"
                value={vehicleSpecifications.transmission || ''}
                onChange={handleSpecificationsChange}
                className="w-full p-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Seating Capacity</label>
              <input
                type="number"
                name="seating_capacity"
                value={vehicleSpecifications.seating_capacity || ''}
                onChange={handleSpecificationsChange}
                className="w-full p-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Color</label>
              <input
                type="text"
                name="color"
                value={vehicleSpecifications.color || ''}
                onChange={handleSpecificationsChange}
                className="w-full p-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium">Features</label>
              <textarea
                name="features"
                value={vehicleSpecifications.features || ''}
                onChange={handleSpecificationsChange}
                className="w-full p-1 border border-gray-300 rounded-md text-sm"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600"
            >
              Create
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default CreateVehicleModal;
