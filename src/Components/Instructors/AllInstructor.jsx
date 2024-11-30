import React from 'react';
import { useFetchAllInstructorsQuery } from '../../features/api/authApi';

const AllInstructor = () => {
  const { data, error, isLoading } = useFetchAllInstructorsQuery();

  if (isLoading) {
    return <div className="text-center text-lg mt-10">Loading instructors...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        Failed to load instructors. Please try again later.
      </div>
    );
  }

  if (!data?.instructors?.length) {
    return (
      <div className="text-center text-gray-600 text-lg mt-10">
        No instructors found.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Meet Our Instructors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col items-center text-center"
          >
            <img
              src={instructor.profilePic || 'https://via.placeholder.com/150'}
              alt={instructor.username}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{instructor.username}</h2>
            <p className="text-gray-600 text-sm">{instructor.email}</p>
            <p className="mt-2 text-gray-500 text-sm italic">
              {instructor.bio || 'No bio available'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllInstructor;
