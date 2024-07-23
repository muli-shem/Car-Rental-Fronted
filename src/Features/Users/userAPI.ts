import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalDomain } from '../../utils/utils';

export interface TUser {
  user_id: number;
  Full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  role: string;
}

const getToken = () => localStorage.getItem('token');

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: LocalDomain,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('authorization', ` ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => 'Users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ user_id }) => ({ type: 'User', id: user_id } as const)),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    addUser: builder.mutation<TUser, Omit<TUser, 'user_id'>>({
      query: (newUser) => ({
        url: 'Users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (user_id) => ({
        url: `Users/${user_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<TUser, { user_id: number } & Partial<TUser>>({
      query: ({ user_id, ...patch }) => ({
        url: `Users/${user_id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['User'],
    }),
    disableUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (user_id) => ({
        url: `Users/${user_id}/disable`,
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useDisableUserMutation,
} = userAPI as {
  useGetUsersQuery: () => ReturnType<typeof userAPI.endpoints.getUsers.useQuery>;
  useAddUserMutation: () => ReturnType<typeof userAPI.endpoints.addUser.useMutation>;
  useDeleteUserMutation: () => ReturnType<typeof userAPI.endpoints.deleteUser.useMutation>;
  useUpdateUserMutation: () => ReturnType<typeof userAPI.endpoints.updateUser.useMutation>;
  useDisableUserMutation: () => ReturnType<typeof userAPI.endpoints.disableUser.useMutation>;
};
