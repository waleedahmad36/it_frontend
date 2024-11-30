// src/features/courseSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { courseApi } from '../api/courseApi'; // We'll create courseApi next

const initialState = {
  courses: [],
  loading: false,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(courseApi.endpoints.getAllCourses.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(courseApi.endpoints.getAllCourses.matchFulfilled, (state, { payload }) => {
        state.courses = payload.courses;
        state.loading = false;
      })
      .addMatcher(courseApi.endpoints.getAllCourses.matchRejected, (state) => {
        state.loading = false;
      });
  },
});

export default courseSlice.reducer;
