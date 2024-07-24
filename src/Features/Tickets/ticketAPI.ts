import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalDomain } from '../../utils/utils';

export interface TTicket {
  ticket_id: number;
  user_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const ticketAPI = createApi({
  reducerPath: 'ticketAPI',
  baseQuery: fetchBaseQuery({
    baseUrl:  LocalDomain,
    prepareHeaders: (headers,{getState}) => {
      const token = getState();
      if (token) {
        headers.set('authorization', ` ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Tickets'],
  endpoints: (builder) => ({
    getTicketsByUserId: builder.query<TTicket[], number>({
      query: (user_id) => `Tickets/user_id=${user_id}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ ticket_id }) => ({ type: 'Tickets', id: ticket_id } as const)), { type: 'Tickets', id: 'LIST' }]
          : [{ type: 'Tickets', id: 'LIST' }],
    }),
    getTicketById: builder.query<TTicket[], number>({
      query: (ticket_id) => `Tickets/${ticket_id}`,
    }),
    getAllTickets: builder.query<TTicket[], void>({
      query: () => 'Tickets',
      providesTags: (result) =>
        result
          ? [...result.map(({ ticket_id }) => ({ type: 'Tickets', id: ticket_id } as const)), { type: 'Tickets', id: 'ALL_LIST' }]
          : [{ type: 'Tickets', id: 'ALL_LIST' }],
    }),
    createTicket: builder.mutation<TTicket, Partial<TTicket>>({
      query: (newTicket) => ({
        url: 'Tickets',
        method: 'POST',
        body: newTicket,
      }),
      invalidatesTags: ['Tickets'],
    }),
    updateTicket: builder.mutation<TTicket, Partial<TTicket & {ticket_id:number}>>({
      query: ({ ticket_id, ...patch }) => ({
        url: `Tickets/${ticket_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags:['Tickets'],
    }),
    deleteTicket: builder.mutation({
      query: (ticket_id) => ({
        url: `Tickets/${ticket_id}`,
        method: 'DELETE',
      }),
      invalidatesTags:['Tickets'],
    }),
  }),
});

