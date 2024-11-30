import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";  // Import authSlice reducer

//  // Placeholder for future API (courses)
// import { purchaseApi } from "@/features/api/purchaseApi"; // Placeholder for future API (purchases)
import { authApi } from "../features/api/authApi";
import { courseApi } from "../features/api/courseApi";
// import { courseProgressApi } from "@/features/api/courseProgressApi"; // Placeholder for future API (course progress)

// Combine the reducers
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer, // Add authApi reducer
  [courseApi.reducerPath]: courseApi.reducer, // Future courseApi
//   [purchaseApi.reducerPath]: purchaseApi.reducer, // Future purchaseApi
//   [courseProgressApi.reducerPath]: courseProgressApi.reducer, // Future courseProgressApi
  auth: authReducer,  // Add authSlice reducer for user authentication
});

export default rootReducer;
