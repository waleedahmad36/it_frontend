import React, { useEffect, useState } from 'react';
import { FaUsers, FaBook } from 'react-icons/fa'; // Import icons for Users and Courses
import axios from 'axios';
import { useGetAllCoursesQuery } from '../features/api/courseApi';
import { API_URL } from '../constants';
import CreateQuiz from '../Components/Quiz/CreateQuiz';
const AdminDashboard = ({user}) => {
  const [users, setUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('users');
  const [loading, setLoading] = useState(false);
  const { data: courses, error, isLoading } = useGetAllCoursesQuery();
  console.log(courses);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/v1/admin/allusers`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const defaultProfilePic =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-16 hover:w-64 transition-all duration-300 ease-in-out hidden md:block">
        <div className="flex flex-col items-center pt-4">
          <div className="w-full flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="logo"
              className="w-12 h-12 rounded-full cursor-pointer"
            />
          </div>
          <div className="space-y-4">
            <div
              className="group flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
              onClick={() => setSelectedTab('users')}
            >
              <FaUsers className="text-2xl group-hover:text-red-600" />
              <span className="hidden group-hover:block text-xl">Users</span>
            </div>
            <div
              className="group flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
              onClick={() => setSelectedTab('courses')}
            >
              <FaBook className="text-2xl group-hover:text-red-600" />
              <span className="hidden group-hover:block text-xl">Courses</span>
            </div>

            <div
    className="group flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
    onClick={() => setSelectedTab('createQuiz')}
  >
    <FaBook className="text-2xl group-hover:text-red-600" />
    <span className="hidden group-hover:block text-xl">Create Quiz</span>
  </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {/* Tabs for users and courses */}
        <div className="flex space-x-6 mb-6">
          <button
            onClick={() => setSelectedTab('users')}
            className={`${
              selectedTab === 'users' ? 'bg-gray-700' : 'bg-gray-800'
            } px-4 py-2 rounded-md text-white transition-all duration-200`}
          >
            Users
          </button>
          <button
            onClick={() => setSelectedTab('courses')}
            className={`${
              selectedTab === 'courses' ? 'bg-gray-700' : 'bg-gray-800'
            } px-4 py-2 rounded-md text-white transition-all duration-200`}
          >
            Courses
          </button>
        </div>

        {/* Conditional Rendering for Users and Courses */}
        {selectedTab === 'users' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Users</h2>
            {loading ? (
              <p className="text-center text-lg text-gray-500">Loading users...</p>
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2">Profile</th>
                      <th className="px-4 py-2">Username</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Role</th>
                      <th className="px-4 py-2">Bio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-t hover:bg-gray-100">
                        <td className="px-4 py-2">
                          <img
                            src={user.profilePic || defaultProfilePic}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-4 py-2">{user.username}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2 capitalize">{user.role}</td>
                        <td className="px-4 py-2">{user.bio || 'No bio available'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'courses' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Courses</h2>
            {isLoading ? (
              <p className="text-center text-lg text-gray-500">Loading courses...</p>
            ) : error ? (
              <p className="text-center text-lg text-red-600">Error fetching courses</p>
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2">Title</th>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Instructor</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses?.courses?.map((course) => (
                      <tr key={course._id} className="border-t hover:bg-gray-100">
                        <td className="px-4 py-2">{course.title}</td>
                        <td className="px-4 py-2">{course.category}</td>
                        <td className="px-4 py-2">{course.instructor?.username}</td>
                        <td className="px-4 py-2">{course.isPaid ? `$${course.price}` : 'Free'}</td>
                        <td className="px-4 py-2">{course.isPublished ? 'Published' : 'Not Published'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}


{selectedTab === 'createQuiz' && (
  <CreateQuiz  user={user}  />  // Render CreateQuiz component when 'Create Quiz' tab is selected
)}
      </div>
    </div>
  );
};

export default AdminDashboard;
