import React, { useState } from 'react';
import Course from './Course';
import { useGetAllCoursesQuery } from '../../features/api/courseApi';

const AllCourses = () => {
  const { data, error, isLoading } = useGetAllCoursesQuery();
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default category

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading courses</div>;
  }

  // Filter courses based on selected category
  const filteredCourses = selectedCategory === 'All'
    ? data.courses
    : data.courses.filter(course => course.category === selectedCategory);

  // Categories to display in sidebar
  const categories = ['All', 'Web Development', 'Data Science', 'Mern stack', 'Full Stack', 'Business', 'Mobile Development'];

  return (
    <div className="flex flex-col md:flex-row pt-10">
      {/* Sidebar for Categories */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer py-2 px-4 rounded ${selectedCategory === category ? 'bg-gray-600' : 'hover:bg-gray-600'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Courses Display Area */}
      <div className="w-full md:w-3/4 py-20 px-4 flex flex-wrap gap-5">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => <Course key={course._id} course={course} />)
        ) : (
          <div>No courses available in this category.</div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
