import React, { useState } from 'react';
import { useFetchUsersQuery } from '../features/api/adminActionApi';
import CreateQuiz from '../Components/Quiz/CreateQuiz';

const InstructorDashboard = ({ user }) => {
  const { data: users, isLoading } = useFetchUsersQuery();
  const [activeTab, setActiveTab] = useState('students');

  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  const students = users?.filter((user) => user.role === 'student');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-semibold border-b border-gray-600">
          Instructor Dashboard
        </div>
        <nav className="flex-1">
          <button
            className={`block w-full text-left px-4 py-3 hover:bg-gray-700 ${
              activeTab === 'students' ? 'bg-gray-700' : ''
            }`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
          <button
            className={`block w-full text-left px-4 py-3 hover:bg-gray-700 ${
              activeTab === 'createQuiz' ? 'bg-gray-700' : ''
            }`}
            onClick={() => setActiveTab('createQuiz')}
          >
            Create Quiz
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {activeTab === 'students' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Students</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {students?.length > 0 ? (
                students.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white shadow-md p-4 rounded-md"
                  >
                    <h3 className="text-lg font-semibold">{student.name}</h3>
                    <p className="text-gray-600">{student.email}</p>
                  </div>
                ))
              ) : (
                <div>No students found.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'createQuiz' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
            <CreateQuiz   user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
