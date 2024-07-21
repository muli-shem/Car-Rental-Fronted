import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the types for vehicle specifications
export interface TVehicleSpecifications {
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
}

// Define the type for a single vehicle
export interface TVehicle {
  id: number;
  vehicle_id:number;
  rental_rate: number;
  availability: boolean;
  VehicleSpecifications: TVehicleSpecifications;
}

// Define the API slice
export const VehicleAPI = createApi({
  reducerPath: 'VehicleAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }), // Adjust base URL as per your backend setup
  endpoints: (builder) => ({
    getAllVehicles: builder.query<TVehicle[], void>({
      query: () => '/VehiclesVehicleSpecifications', // Endpoint path on your backend to fetch all vehicles
    }),
  }),
});

// Export the auto-generated hook for getting all vehicles
export const {useGetAllVehiclesQuery }= VehicleAPI as{
  useGetAllVehiclesQuery: ()=>ReturnType< typeof VehicleAPI.endpoints.getAllVehicles.useQuery>
}


// Export the API slice
export const { reducerPath, reducer: vehicleApiReducer } = VehicleAPI;

// Export other auto-generated parts like hooks, setupListeners, etc. if needed

