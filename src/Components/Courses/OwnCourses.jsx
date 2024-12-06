import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Course from './Course'; // Assuming you already have the Course component
import { API_URL } from '../../constants';
import { useGetAllCoursesQuery } from '../../features/api/courseApi';

const InstructorCourses = ({user}) => {
  const { data : courses, error, isLoading } = useGetAllCoursesQuery();
  const [loading, setLoading] = useState(true);


  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="courses-list">
      {courses.length === 0 ? (
        <p>No courses available for this instructor.</p>
      ) : (
        <div   className='flex flex-wrap gap-4' >
       {
         courses?.courses?.map((course) => (
          user._id === course.instructor._id && (
            <Course key={course._id} course={course} /> // Passing course data to the Course component
          )
        ))
       }
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
