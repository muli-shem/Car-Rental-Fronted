// vehicleAPI.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalDomain } from '../../utils/utils';

export interface VehicleSpecifications {
  vehicleSpec_id: number;
  vehicle_id: number;
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

export interface Vehicle {
  vehicle_id: number;
  rental_rate: string;
  availability: boolean;
  VehicleSpecifications: VehicleSpecifications;
}

export const allvehiclespcisAPI = createApi({
  reducerPath: 'allvehiclespcisAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: LocalDomain,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token =state?.auth?.token;
      console.log('Token:', token); // Debugging: Check if token is being retrieved
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },

  }),
  tagTypes: ['Vehicles'],
  endpoints: (builder) => ({
    getVehicles: builder.query<Vehicle[], void>({
      query: () => 'VehiclesVehicleSpecifications',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ vehicle_id }) => ({ type: 'Vehicles', id: vehicle_id } as const)),
              { type: 'Vehicles', id: 'LIST' },
            ]
          : [{ type: 'Vehicles', id: 'LIST' }],
    }),
    createVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
      query: (newVehicle) => ({
        url: 'Vehicles',
        method: 'POST',
        body: newVehicle,
      }),
      invalidatesTags: [{ type: 'Vehicles', id: 'LIST' }],
    }),
  
    updateVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
      query: ({ vehicle_id, ...patch }) => ({
        url: `Vehicles/${vehicle_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: [{ type: 'Vehicles', id: 'LIST' }],
    }),
    deleteVehicle: builder.mutation<{ success: boolean; vehicle_id: number }, number>({
      query: (vehicle_id) => ({
        url: `Vehicles/${vehicle_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Vehicles', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useCreateVehicleMutation
} = allvehiclespcisAPI as{
  useGetVehiclesQuery:()=>ReturnType< typeof allvehiclespcisAPI.endpoints.getVehicles.useQuery>
    useUpdateVehicleMutation:()=>ReturnType<typeof allvehiclespcisAPI.endpoints.updateVehicle.useMutation>
    useDeleteVehicleMutation:()=>ReturnType<typeof allvehiclespcisAPI.endpoints.deleteVehicle.useMutation>
    useCreateVehicleMutation:()=>ReturnType<typeof allvehiclespcisAPI.endpoints.createVehicle.useMutation>
  }
