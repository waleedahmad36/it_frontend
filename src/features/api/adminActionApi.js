import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

const ADMIN_API = `${API_URL}/api/v1/admin`;

export const adminActionApi = createApi({
  reducerPath: 'adminActionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ADMIN_API,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Fetch all users
    fetchUsers: builder.query({
      query: () => '/allusers',
      providesTags: ['User'],
    }),

    // Fetch all unverified users
    fetchUnverifiedUsers: builder.query({
      query: () => '/unverified',
      providesTags: ['User'],
    }),

    // Update user verification status (verify, unverify, delete)
    updateUserVerification: builder.mutation({
      query: ({ userId, action }) => ({
        url: '/update-verification',
        method: 'POST',
        body: { userId, action },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks for use in components
export const {
  useFetchUsersQuery,
  useFetchUnverifiedUsersQuery,
  useUpdateUserVerificationMutation,
} = adminActionApi;

export default adminActionApi;
