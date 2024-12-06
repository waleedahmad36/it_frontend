import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

const PLAYLIST_API = `${API_URL}/api/v1/playlist`;

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: PLAYLIST_API,
    credentials: 'include',
  }),
  tagTypes: ['Playlist'],
  endpoints: (builder) => ({
    getAllPlaylists: builder.query({
      query: () => '/',
      providesTags: ['Playlist'],
    }),
    getPlaylistById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Playlist', id }],
    }),
    createPlaylist: builder.mutation({
      query: (playlistData) => ({
        url: '/create',
        method: 'POST',
        body: playlistData,
      }),
      invalidatesTags: ['Playlist'],
    }),
    updatePlaylist: builder.mutation({
      query: ({ id, playlistData }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: playlistData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Playlist', id }],
    }),
    deletePlaylist: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Playlist'],
    }),
    addCourseToPlaylist: builder.mutation({
      query: (data) => ({
        url: '/add-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Playlist'],
    }),
    removeCourseFromPlaylist: builder.mutation({
      query: (data) => ({
        url: '/remove-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Playlist'],
    }),
  }),
});

export const {
  useGetAllPlaylistsQuery,
  useGetPlaylistByIdQuery,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
  useAddCourseToPlaylistMutation,
  useRemoveCourseFromPlaylistMutation,
} = playlistApi;
