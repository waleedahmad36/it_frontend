import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import CourseDetail from "./pages/CourseDetail";
import Footer from "./Components/Home/Footer";
import LoginPage from "./pages/LoginPage";
import Signup from "./Components/Signup";
import { userLoggedIn } from "./features/authSlice";
import ProfilePage from "./pages/ProfilePage";
import CreateCourse from "./Components/CreateCourse";
import AdminDashboard from "./pages/AdminDashbaord";
import { API_URL } from "./constants";
import Quiz from "./pages/Quiz";
import CertificateTemplate from "./Components/Quiz/CertificateTemplate";
import AllInstructor from "./Components/Instructors/AllInstructor";
import About from "./Components/About";

// Function to check if the user is logged in (you can modify this logic if needed)
const checkUserStatus = async (dispatch) => {
  const response = await fetch(`${API_URL}/api/v1/auth/authCheck`, {
    credentials: "include",
  });
  const data = await response.json();
  if (data.user) {
    dispatch(userLoggedIn({ user: data.user }));
  }
};

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  useEffect(() => {
    checkUserStatus(dispatch); // Check user status on page load
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path="/" element={user ? <HomePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/courses/create" element={user ? <CreateCourse user={user} /> : <Navigate to="/login" />} />
        <Route path="/courses" element={user ? <CoursePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/courses/:id" element={user ? <CourseDetail user={user} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/admin/dashboard" element={user && user.role === 'admin' ? <AdminDashboard  user={user} /> : <Navigate to="/login" />} />
        <Route path="/quiz" element={user  ? <Quiz  user={user} /> : <Navigate to="/login" />} />
        <Route path="/instructors" element={user ? <AllInstructor/> : <Navigate to='/login' /> }  />
        <Route path='/about'  element={user ? <About/> :  <Navigate to='/login' />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
