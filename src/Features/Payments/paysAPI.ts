// src/redux/api/paysAPI.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalDomain } from '../../utils/utils';
// src/types/payment.d.ts
export interface Payment {
    payment_id: number;
    booking_id: number;
    amount: number;
    transaction_id: string;
    payment_method: string;
    payment_date: string;
    payment_status: string;
    created_at: string;
    updated_at: string;
  }
  const getToken = () => localStorage.getItem('token'); // Adjust this to your token retrieval logic

  export const paysAPI = createApi({
    reducerPath: 'paysAPI',
    baseQuery: fetchBaseQuery({
      baseUrl: LocalDomain,
      prepareHeaders: (headers) => {
        const token = getToken();
        if (token) {
          headers.set('Authorization', ` ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getPayments: builder.query<Payment[], void>({
        query: () => '/Payments',
      }),
      deletePayment: builder.mutation<void, number>({
        query: (payment_id) => ({
          url: `/Payments/${payment_id}`,
          method: 'DELETE',
        }),
      }),
    }),
  });


