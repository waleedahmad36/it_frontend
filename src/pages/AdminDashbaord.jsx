import React, { useEffect, useState } from 'react';
import { FaUsers, FaBook } from 'react-icons/fa';
import Select from 'react-select';
import { useFetchUsersQuery, useUpdateUserVerificationMutation } from '../features/api/adminActionApi';
import CreateQuiz from '../Components/Quiz/CreateQuiz';
import { useGetAllCoursesQuery } from '../features/api/courseApi';
import Course from '../Components/Courses/Course';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = ({ user }) => {
  const { data: courses } = useGetAllCoursesQuery();
  const [selectedTab, setSelectedTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const { data: users = [], isLoading: usersLoading, isError: usersError } = useFetchUsersQuery();
  const [updateUserVerification] = useUpdateUserVerificationMutation();
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const defaultProfilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const filteredUsers = users
    .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((user) => {
      if (userFilter === 'all') return true;
      return user.isVerified ? userFilter === 'verified' : userFilter === 'unverified';
    });

  const handleUserAction = async (userId, action) => {
    await updateUserVerification({ userId, action });
    toast.success(`${action} action successful`);
  };

  const handleFilterChange = (selectedOption) => {
    setUserFilter(selectedOption.value);
  };


  useEffect(()=>{
    if(user.role !== 'admin'){
      window.location.href('/')
    }
  },[])

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div
        className={`bg-gray-800 transition-all hidden md:block duration-300 ${isSidebarExpanded ? 'w-64' : 'w-16'} hover:w-64`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="p-4">
          <FaUsers className="text-3xl mb-4" />
          <FaBook className="text-3xl" />
        </div>
      </div>
      <div className="flex-1 p-6 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <div className="flex flex-wrap space-x-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search username"
            className="px-4 py-2 bg-gray-800 text-white rounded"
          />
          <button
            onClick={() => setSelectedTab('users')}
            className={`px-4 py-2 ${selectedTab === 'users' ? 'bg-gray-700' : 'bg-gray-800'}`}
          >
            Users
          </button>
          <button
            onClick={() => setSelectedTab('courses')}
            className={`px-4 py-2 ${selectedTab === 'courses' ? 'bg-gray-700' : 'bg-gray-800'}`}
          >
            Courses
          </button>
          <button
            onClick={() => setSelectedTab('quiz')}
            className={`px-4 py-2 ${selectedTab === 'quiz' ? 'bg-gray-700' : 'bg-gray-800'}`}
          >
            Create Quiz
          </button>
        </div>

        {selectedTab === 'users' && (
          <>
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <div className="mb-6">
              <Select
                options={[
                  { value: 'all', label: 'All Users' },
                  { value: 'verified', label: 'Verified Users' },
                  { value: 'unverified', label: 'Unverified Users' },
                ]}
                onChange={handleFilterChange}
                defaultValue={{ value: 'all', label: 'All Users' }}
                className="w-48"
              />
            </div>
            {usersLoading ? (
              <p>Loading...</p>
            ) : usersError ? (
              <p>Error fetching users</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-800 rounded">
                  <thead className="bg-gray-700 ">
                    <tr   >
                      <th>Profile</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <img src={user.profilePic || defaultProfilePic} alt="Profile" className="w-12 h-12 rounded-full" />
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <select
                            onChange={(e) => handleUserAction(user._id, e.target.value)}
                            className="bg-gray-700 text-white rounded px-4 py-1"
                          >
                            <option value="">Actions</option>
                            {!user.isVerified && <option value="verify">Verify</option>}
                            {user.isVerified && <option value="unverify">Unverify</option>}
                            <option value="delete">Delete</option>
                            <option value="makeAdmin">Make Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {selectedTab === 'courses' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Courses</h2>
            <div>
              {courses?.courses?.map((course) => (
                <div key={course._id} className="mb-4">
                  <Course course={course} />
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'quiz' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Create Quiz</h2>
            <CreateQuiz user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
