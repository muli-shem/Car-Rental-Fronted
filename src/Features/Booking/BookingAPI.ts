import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TBookings {
  booking_id: number;
  location_id:number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
}

export const bookingAPI = createApi({
  reducerPath: "bookingAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  tagTypes: ['Bookings'],
  endpoints: (builder) => ({
    getBookings: builder.query<TBookings[], void>({
      query: () => "Bookings",
      providesTags: (result) => 
        result ? 
          [...result.map(({ booking_id }) => ({ type: 'Bookings', id: booking_id } as const)), { type: 'Bookings', id: 'LIST' }] 
          : [{ type: 'Bookings', id: 'LIST' }],
    }),
    getoneBook:builder.query<TBookings, Partial<TBookings>>({
      query:(id)=> ({
      url: `Bookings/${id}`,
      })
    }),
    createBooking: builder.mutation<TBookings, Partial<TBookings>>({
      query: (newBooking) => ({
        url: "Bookings",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: [{ type: 'Bookings', id: 'LIST' }],
    }),
    updateBooking: builder.mutation<TBookings, Partial<TBookings>>({
      query: ({ booking_id, ...rest }) => ({
        url: `Bookings/${booking_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Bookings'],
    }),
    deleteBooking: builder.mutation<{ success: boolean; id: number }, number>({
      query: (booking_id) => ({
        url: `Bookings/${booking_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookings'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetoneBookQuery
} = bookingAPI as {
  useGetBookingsQuery:()=>ReturnType <typeof bookingAPI.endpoints.getBookings.useQuery>
  useCreateBookingMutation:()=>ReturnType<typeof bookingAPI.endpoints.createBooking.useMutation>
  useUpdateBookingMutation:()=>ReturnType<typeof bookingAPI.endpoints.updateBooking.useMutation>
  useDeleteBookingMutation:()=>ReturnType<typeof bookingAPI.endpoints.deleteBooking.useMutation>
  useGetoneBookQuery: (UserId: number, options?: { pollingInterval?: number }) => ReturnType<typeof bookingAPI.endpoints.getoneBook.useQuery>;
 
}
