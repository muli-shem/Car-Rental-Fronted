import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TUser {
  user_id: number;
  Full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  role: string;
  created_at: string;
  updated_at: string;
}
const getToken = () => localStorage.getItem('token');

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
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
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (user_id) => ({
        url: `Users/${user_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<TUser, Partial<TUser>>({
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
  useDeleteUserMutation,
  useUpdateUserMutation,
  useDisableUserMutation,
} = userAPI as {
    useGetUsersQuery:()=>ReturnType<typeof userAPI.endpoints.getUsers.useQuery>
    useUpdateUserMutation:()=>ReturnType<typeof userAPI.endpoints.updateUser.useMutation>
    useDeleteUserMutation:()=>ReturnType<typeof userAPI.endpoints.deleteUser.useMutation>
    useDisableUserMutation:()=>ReturnType<typeof userAPI.endpoints.disableUser.useMutation>
}
