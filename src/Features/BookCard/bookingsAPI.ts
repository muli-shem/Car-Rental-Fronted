import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {LocalDomain} from '../../utils/utils'

export interface Booking {
  booking_id:number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
}
export interface Payments{
  sessionId:string,
  checkoutUrl:string,
  booking_id:number,
  amount:number,
  transaction_id: string,
  payment_method: string,
  payment_status: string,
  url: string
}


export const bookingsAPI = createApi({
  reducerPath: 'bookingsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: LocalDomain }),
  endpoints: (builder) => ({
    addBooking: builder.mutation<Booking, Partial<Booking>>({
      query: (booking) => ({
        url: 'Bookings',
        method: 'POST',
        body: booking,
      }),
    }),
  }),
});
export const {useAddBookingMutation }= bookingsAPI as {
  useAddBookingMutation :()=> ReturnType<typeof bookingsAPI.endpoints.addBooking.useMutation>
}
export const paymentAPI = createApi({
  reducerPath: 'paymentAPI',
  baseQuery: fetchBaseQuery({ baseUrl: LocalDomain }),
  endpoints: (builder) => ({
    addPayment: builder.mutation<Payments, Partial<Payments>>({
      query: (payload) => ({
        url: 'create-checkout-session',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});
export const {useAddPaymentMutation}= paymentAPI as {
  useAddPaymentMutation:()=> ReturnType<typeof paymentAPI.endpoints.addPayment.useMutation>
}
