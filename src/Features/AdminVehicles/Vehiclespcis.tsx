import { useState, useEffect } from 'react';
import { useGetVehiclesQuery, useUpdateVehicleMutation, useDeleteVehicleMutation, useCreateVehicleMutation } from './allvehiclespcisAPI';
import EditVehicleModal from './EditVehicleModal';
import CreateVehicleModal from './AddVehicleModal'; // Import the CreateVehicleModal component
import { Toaster, toast } from 'sonner';
import { Vehicle } from './allvehiclespcisAPI';

import defaultImage from '../../assets/Images/download (2).jpeg';
import Honda from '../../assets/Images/Honda 1.jpeg';
import Hondas from '../../assets/Images/Honda 2.jpeg';
import Vitz from '../../assets/Images/Vitz.jpeg';
import Corola from '../../assets/Images/Corola.jpeg';
import Audi from '../../assets/Images/Audi.jpeg';
import V8 from "../../assets/Images/V8.jpg";
import Ford from "../../assets/Images/Ford.jpeg";
import chev from '../../assets/Images/chev.jpeg';
import fortuner from '../../assets/Images/Fortuner toyota.jpeg';

const modelImageMap: Record<string, string> = {
  'Honda': Honda,
  'Hondas': Hondas,
  'Vitz': Vitz,
  'Corola': Corola,
  'Audi': Audi,
  'Other': defaultImage,
  'V8': V8,
  'Ford': Ford,
  'Chevrolet': chev,
  'Fortuner': fortuner,
};

const VehicleTable = () => {
  const { data: vehicles, isLoading, isError, refetch } = useGetVehiclesQuery();
  const [updateVehicle] = useUpdateVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();
  const [createVehicle] = useCreateVehicleMutation(); // Create a mutation for creating vehicles
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for the create modal

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  const handleUpdate = async (updatedVehicle: Partial<Vehicle>) => {
    if (selectedVehicle) {
      try {
        const vehicleId = selectedVehicle.vehicle_id;
        const payload = { vehicle_id: vehicleId, ...updatedVehicle };
        console.log('Updating vehicle with payload:', payload); // Debugging
        await updateVehicle(payload).unwrap();
        toast.success('Vehicle updated successfully');
        setIsEditModalOpen(false); // Close modal on success
      } catch (error) {
        toast.error('Error updating vehicle');
        console.error('Update error:', error); // Debugging
      }
    }
  };

  const handleDelete = async (vehicle_id: number) => {
    try {
      await deleteVehicle(vehicle_id).unwrap();
      toast.success('Vehicle deleted successfully');
    } catch (error) {
      toast.error('Error deleting vehicle');
      console.error('Delete error:', error); // Debugging
    }
  };

  const handleCreate = async (newVehicle: Partial<Vehicle>) => {
    try {
      await createVehicle(newVehicle).unwrap();
      toast.success('Vehicle created successfully');
      setIsCreateModalOpen(false); // Close modal on success
    } catch (error) {
      toast.error('Error creating vehicle');
      console.error('Create error:', error); // Debugging
    }
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
      <div className="bg-gray-200 rounded-lg p-4 text-base-content">
        <h1 className="text-xl my-4">Vehicles Data</h1>
        <button
          className="btn btn-primary mb-4"
          onClick={() => setIsCreateModalOpen(true)} // Open the create modal
        >
          Add New Vehicle
        </button>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>No Data</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles &&
              vehicles.map((vehicle: Vehicle) => {
                const vehicleImage = modelImageMap[vehicle.VehicleSpecifications.model] || defaultImage;

                return (
                  <div key={vehicle.vehicle_id} className="p-2 bg-white rounded-lg shadow-md flex flex-col justify-between">
                    <img src={vehicleImage} alt={vehicle.VehicleSpecifications.model} className="w-full h-24 object-contain mb-2 rounded-lg" />
                    <div className="text-sm">
                      <p>Rental Rate: {vehicle.rental_rate}</p>
                      <p>Availability: {vehicle.availability ? 'Available' : 'Not Available'}</p>
                      <p>Manufacturer: {vehicle.VehicleSpecifications.manufacturer}</p>
                      <p>Model: {vehicle.VehicleSpecifications.model}</p>
                      <p>Year: {vehicle.VehicleSpecifications.year}</p>
                      <p>Fuel Type: {vehicle.VehicleSpecifications.fuel_type}</p>
                      <p>Engine Capacity: {vehicle.VehicleSpecifications.engine_capacity}</p>
                      <p>Transmission: {vehicle.VehicleSpecifications.transmission}</p>
                      <p>Seating Capacity: {vehicle.VehicleSpecifications.seating_capacity}</p>
                      <p>Color: {vehicle.VehicleSpecifications.color}</p>
                      <p>Features: {vehicle.VehicleSpecifications.features}</p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <button
                        className="btn btn-sm btn-outline btn-info"
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-warning"
                        onClick={() => handleDelete(vehicle.vehicle_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {selectedVehicle && (
        <EditVehicleModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          vehicle={selectedVehicle}
          onUpdate={handleUpdate}
        />
      )}
      <CreateVehicleModal
        isOpen={isCreateModalOpen}
        closeModal={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </>
  );
};

export default VehicleTable;
