import { useState } from 'react';
import { useGetVehiclesQuery, useUpdateVehicleMutation, useDeleteVehicleMutation } from './allvehiclespcisAPI';

import EditVehicleModal from './EditVehicleModal';
import { Toaster, toast } from 'sonner';
import { Vehicle } from './allvehiclespcisAPI';

const VehicleTable = () => {
  const { data: vehicles, isLoading, isError } = useGetVehiclesQuery();
  const [updateVehicle] = useUpdateVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdate = async (vehicle: Partial<Vehicle>) => {
    try {
      await updateVehicle(vehicle).unwrap();
      toast.success('Vehicle updated successfully');
    } catch (error) {
      toast.error('Error updating vehicle');
    }
  };

  const handleDelete = async (vehicle_id: number) => {
    try {
      await deleteVehicle(vehicle_id).unwrap();
      toast.success('Vehicle deleted successfully');
    } catch (error) {
      toast.error('Error deleting vehicle');
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
      <div className="overflow-x-auto bg-gray- rounded-lg p-4 text-base-content">
        <h1 className="text-xl my-4">Vehicles Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th>ID</th>
              <th>Rental Rate</th>
              <th>Availability</th>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Year</th>
              <th>Fuel Type</th>
              <th>Engine Capacity</th>
              <th>Transmission</th>
              <th>Seating Capacity</th>
              <th>Color</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={13}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={13}>No Data</td>
              </tr>
            ) : (
              vehicles && vehicles.map((vehicle: Vehicle) => (
                <tr key={vehicle.vehicle_id}>
                  <th>{vehicle.vehicle_id}</th>
                  <td>{vehicle.rental_rate}</td>
                  <td>{vehicle.availability ? 'Available' : 'Not Available'}</td>
                  <td>{vehicle.VehicleSpecifications.manufacturer}</td>
                  <td>{vehicle.VehicleSpecifications.model}</td>
                  <td>{vehicle.VehicleSpecifications.year}</td>
                  <td>{vehicle.VehicleSpecifications.fuel_type}</td>
                  <td>{vehicle.VehicleSpecifications.engine_capacity}</td>
                  <td>{vehicle.VehicleSpecifications.transmission}</td>
                  <td>{vehicle.VehicleSpecifications.seating_capacity}</td>
                  <td>{vehicle.VehicleSpecifications.color}</td>
                  <td>{vehicle.VehicleSpecifications.features}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline btn-info"
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setIsEditModalOpen(true);
                      }}>
                      Update
                    </button>
                    <button className="btn btn-sm btn-outline btn-warning"
                      onClick={() => handleDelete(vehicle.vehicle_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={13}>{vehicles ? `${vehicles.length} records` : '0 records'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {selectedVehicle && (
        <EditVehicleModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          vehicle={selectedVehicle}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default VehicleTable;
