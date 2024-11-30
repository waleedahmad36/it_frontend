// src/features/api/courseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

const COURSE_API = `${API_URL}/api/v1/course`;

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => 'allcourses', // Your route to get all courses
    }),
  }),
});

export const { useGetAllCoursesQuery } = courseApi;
