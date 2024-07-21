import { useState } from 'react';
import { useGetAllVehiclesQuery } from "./VehicleAPI";
import { Link } from "react-router-dom";
import image from "../../assets/Images/download (2).jpeg";

const VehicleList = () => {
  const { data: vehicles, error, isLoading } = useGetAllVehiclesQuery();
  const [modelFilter, setModelFilter] = useState('');
  const [seatingCapacityFilter, setSeatingCapacityFilter] = useState('');
  const [rentalRateFilter, setRentalRateFilter] = useState('');
  const [viewMoreVehicleId, setViewMoreVehicleId] = useState<number | null>(null);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    if ("status" in error) {
      return <div>Error loading vehicles: Network error</div>;
    }

    if ("message" in error) {
      return <div>Error loading vehicles: {error.message}</div>;
    }

    return <div>Error loading vehicles</div>;
  }

  const handleBookClick = (vehicle_id: number,rental_rate:number) => {
    localStorage.setItem('vehicle_id', vehicle_id.toString());
    localStorage.setItem('rental_rate',rental_rate.toString())
  };

  const filteredVehicles = vehicles?.filter((vehicle: any) => {
    return (
      (modelFilter ? vehicle.VehicleSpecifications.model.toLowerCase().includes(modelFilter.toLowerCase()) : true) &&
      (seatingCapacityFilter ? vehicle.VehicleSpecifications.seating_capacity.toString() === seatingCapacityFilter : true) &&
      (rentalRateFilter ? vehicle.rental_rate <= parseFloat(rentalRateFilter) : true)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Explore Collections</h2>
      <p className="text-lg mb-6">Rent the perfect car to match your vibe</p>
      
      {/* Filter Controls */}
      <div className="bg-white p-4 shadow-md mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Filter by Model"
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Filter by Seating Capacity"
            value={seatingCapacityFilter}
            onChange={(e) => setSeatingCapacityFilter(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max Rental Rate"
            value={rentalRateFilter}
            onChange={(e) => setRentalRateFilter(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVehicles?.map((vehicle: any) => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`${image}`}
              alt={""}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-700 mb-4">
                {vehicle.VehicleSpecifications.description}
              </p>
              <ul className="text-sm text-gray-600 mb-4">
                <li>Model: {vehicle.VehicleSpecifications.model}</li>
                <li>Rental Rate: ${vehicle.rental_rate}</li>
                <li>Seating Capacity: {vehicle.VehicleSpecifications.seating_capacity}</li>
                {viewMoreVehicleId === vehicle.vehicle_id && (
                  <>
                    <li>Availability: {vehicle.availability ? "Available" : "Unavailable"}</li>
                    <li>Manufacturer: {vehicle.VehicleSpecifications.manufacturer}</li>
                    <li>Year: {vehicle.VehicleSpecifications.year}</li>
                    <li>Fuel Type: {vehicle.VehicleSpecifications.fuel_type}</li>
                    <li>Transmission: {vehicle.VehicleSpecifications.transmission}</li>
                    <li>Color: {vehicle.VehicleSpecifications.color}</li>
                    <li>Features: {vehicle.VehicleSpecifications.features}</li>
                  </>
                )}
              </ul>
              <button
                onClick={() => setViewMoreVehicleId(viewMoreVehicleId === vehicle.vehicle_id ? null : vehicle.vehicle_id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
              >
                {viewMoreVehicleId === vehicle.vehicle_id ? 'View Less' : 'View More Details'}
              </button>
              <Link
                to="/dashboard/bookform"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleBookClick(vehicle.vehicle_id,vehicle.rental_rate)}
              >
                BOOK
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
