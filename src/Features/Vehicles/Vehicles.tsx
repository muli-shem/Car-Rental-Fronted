import React from "react";
import { useGetAllVehiclesQuery } from "./VehicleAPI";
import { Link } from "react-router-dom";

import image from "../../assets/Images/download (2).jpeg";
const VehicleList: React.FC = () => {
  const { data: vehicles, error, isLoading } = useGetAllVehiclesQuery();
  // console.log(vehicles)
  if (isLoading) return <div>Loading...</div>;

  // Handle different error types
  if (error) {
    // Check if it's a FetchBaseQueryError (network error)
    if ("status" in error) {
      return <div>Error loading vehicles: Network error</div>;
    }

    // Check if it's a SerializedError (error from server)
    if ("message" in error) {
      return <div>Error loading vehicles: {error.message}</div>;
    }

    // Fallback error message
    return <div>Error loading vehicles</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Explore Collections</h2>
      <p className="text-lg mb-6">Rent the perfect car to match your vibe</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicles?.map((vehicle: any) => (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`${image}`}
              alt={""}
              className="w-full h-48 object-cover"
            />
            <div key={vehicle.id} className="p-4">
              <p className="text-gray-700 mb-4">
                {vehicle.VehicleSpecifications.description}
              </p>
              <ul className="text-sm text-gray-600 mb-4">
                <li>Rental Rate: ${vehicle.rental_rate}</li>
                <li>
                  Availability:{" "}
                  {vehicle.availability ? "Available" : "Unavailable"}
                </li>
                <li>
                  Manufacturer: {vehicle.VehicleSpecifications.manufacturer}
                </li>
                <li>Model: {vehicle.VehicleSpecifications.model}</li>
                <li>Year: {vehicle.VehicleSpecifications.year}</li>
                <li>Fuel Type: {vehicle.VehicleSpecifications.fuel_type}</li>
                {/* <li>Engine Capacity: {vehicle.VehicleSpecifications.engine_capacity}</li> */}
                <li>
                  Transmission: {vehicle.VehicleSpecifications.transmission}
                </li>
                <li>
                  Seating Capacity:{" "}
                  {vehicle.VehicleSpecifications.seating_capacity}
                </li>
                {/* <li>Color: {vehicle.VehicleSpecifications.color}</li>  */}
                <li>Features: {vehicle.VehicleSpecifications.features}</li>
              </ul>
              <Link
                to="/payment"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
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
