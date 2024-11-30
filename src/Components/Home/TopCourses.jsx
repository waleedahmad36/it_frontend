import React, { useState, useEffect } from 'react';
import { FaCartPlus, FaStarOfLife } from 'react-icons/fa';
import './TopCourses.css';
import { useGetAllCoursesQuery } from '../../features/api/courseApi';
import Course from '../Courses/Course';

const TopCourses = () => {
  const [courses, setCourses] = useState([]); // Initialize as an empty array
  const { data, error, isLoading } = useGetAllCoursesQuery();

  // Update courses safely when data changes
  useEffect(() => {
    if (data && Array.isArray(data.courses)) {
      setCourses(data.courses); // Ensure we're using the courses array
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading courses. Please try again later.</p>;
  }

  return (
    <>
      <div className="w-full pt-20" id='topcourse'  >
        <h2 className="text-7xl font-extrabold text-center text-shadow-xl">
          Top Online Courses
        </h2>

        <p className="text-center text-lg mt-5 text-gray-900">
          The world’s largest selection of courses choose from 130,000 online video <br /> courses with new additions published every month
        </p>

        <div className="w-full px-4 my-20 flex justify-start gap-5 overflow-x-auto custom-scrollbar"  >
          {/* Map over courses safely */}
          {courses.length > 0 ? (
            courses.map((course) => <Course key={course.id} course={course} />)
          ) : (
            <p>No courses available at the moment.</p>
          )}
        </div>

        <div className="w-full flex justify-center my-10">
          <button className="bg-red-600 text-white px-6 py-4 rounded-md hover:bg-transparent hover:text-red-600 hover:border-red-600 hover:border-2">
            View All Courses
          </button>
        </div>
      </div>

      <div className="mx-auto w-full h-[60vh] md:h-[80vh] mt-20 text-center flex flex-col items-center justify-center gap-5">
        <h3 className="text-4xl md:text-6xl text-gray-800 font-bold">
          Begin Your Learning Journey Today
        </h3>
        <p className="text-lg text-gray-600 max-w-[650px]">
          Join millions of learners from around the world, and start a course now that will help you achieve your career goals!
        </p>
        <button className="bg-red-600 text-white px-6 py-4 rounded-md hover:bg-transparent hover:text-red-600 hover:border-red-600 hover:border-2">
          Get Started
        </button>
      </div>
    </>
  );
};

export default TopCourses;
