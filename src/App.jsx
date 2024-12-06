import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./pages/HomePage";
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
import AllInstructor from "./Components/Instructors/AllInstructor";
import About from "./Components/About";
import ContactPage from "./pages/ContactPage";
import CourseDashbaord from "./pages/CourseDashbaord";
import CourseCreationForm from "./Components/Courses/CourseCreateForm";
import { useGetAllCoursesQuery } from "./features/api/courseApi";
import PlaylistPage from "./pages/PlaylistPage";
import { Toaster } from "react-hot-toast";
import AllCourses from "./Components/Courses/AllCourses";
import InstructorDashboard from "./pages/InstructorDashboard";

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
  const location = useLocation();
  const { data: courses } = useGetAllCoursesQuery();
  const [discountCourse, setDiscountCourse] = useState(null);
  const [showDiscountBanner, setShowDiscountBanner] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    checkUserStatus(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (courses?.courses?.length) {
      const discounted = courses.courses.find(
        (course) => course.discountPrice && course.discountPrice < course.price
      );
      if (discounted) {
        setDiscountCourse(discounted);
      }
    }
  }, [courses]);

  useEffect(() => {
    if (location.pathname === "/" && discountCourse) {
      const timeout = setTimeout(() => {
        setShowDiscountBanner(true);
      }, 5000); // 5 seconds delay
      return () => clearTimeout(timeout);
    } else {
      setShowDiscountBanner(false);
    }
  }, [location.pathname, discountCourse]);

  return (
    <>
      <Navbar user={user} />

      {showDiscountBanner && discountCourse && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 2.5 }} // Smooth 2.5 seconds animation
          className="fixed z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 rounded-lg max-w-lg flex flex-col items-center"
        >
          <button
            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            onClick={() => setShowDiscountBanner(false)}
          >
            ✕
          </button>
          <div className="relative">
            <img
              src={discountCourse.thumbnail}
              alt="Course Thumbnail"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center">
              {/* {Math.round(
                ((discountCourse.price - discountCourse.discountPrice) /
                  discountCourse.price) *
                  100
              )} */}
              50%
            </div>
          </div>
          <h3 className="font-bold text-xl mt-4 text-gray-800">Special Offer!</h3>
          <p className="text-gray-600 text-center mt-2">
            Get <strong>{discountCourse.title}</strong> for just{" "}
            <span className="text-green-500 font-bold">
              ${discountCourse.discountPrice}
            </span>{" "}
            (Original Price: ${discountCourse.price})!
          </p>
        </motion.div>
      )}

      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path="/" element={user ? <HomePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/courses/create" element={user ? <CourseCreationForm user={user} /> : <Navigate to="/login" />} />
        <Route path="/manage/course" element={user ? <CourseDashbaord user={user} /> : <Navigate to="/login" />} />
        <Route path="/courses" element={user ? <AllCourses user={user} /> : <Navigate to="/login" />} />
        <Route path="/courses/:id" element={user ? <CourseDetail user={user} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/admin/dashboard" element={user && user.role === "admin" ? <AdminDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/instructor/dashboard" element={user && user.role === "instructor" ? <InstructorDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/quiz" element={user ? <Quiz user={user} /> : <Navigate to="/login" />} />
        <Route path="/instructors" element={user ? <AllInstructor /> : <Navigate to="/login" />} />
        <Route path="/about" element={user ? <About /> : <Navigate to="/login" />} />
        <Route path="/contact" element={user ? <ContactPage /> : <Navigate to="/login" />} />
        <Route path="/playlist" element={user ? <PlaylistPage /> : <Navigate to="/login" />} />
      </Routes>

      <Footer />

      <Toaster />
    </>
  );
}

export default App;
