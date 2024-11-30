import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";  // Import the rootReducer that combines all slices and API reducers
import { authApi } from "../features/api/authApi";  // Import authApi for authentication-related API requests
import { courseApi } from "../features/api/courseApi";  // Import courseApi for handling course-related API requests

// Configure the Redux store
export const appStore = configureStore({
  reducer: rootReducer,  // Your rootReducer which includes authApi and courseApi reducers
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,  // Add authApi middleware for handling authentication API requests
      courseApi.middleware // Add courseApi middleware for handling course-related API requests
    ),
});

export default appStore;
