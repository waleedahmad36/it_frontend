import React, { useState } from 'react';
import Course from './Course';
import { useGetAllCoursesQuery } from '../../features/api/courseApi';

const AllCourses = () => {
  const { data, error, isLoading } = useGetAllCoursesQuery();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');

  if (isLoading) {
    return <div className="text-center text-lg font-semibold text-gray-600 py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg font-semibold text-red-600 py-10">Error loading courses</div>;
  }

  const filteredCourses = data.courses
    .filter((course) =>
      selectedCategory === 'All' || course.category === selectedCategory
    )
    .filter((course) =>
      selectedPrice === 'All' ||
      (selectedPrice === 'Free' && !course.isPaid) ||
      (selectedPrice === 'Paid' && course.isPaid)
    )
    .filter((course) => {
      if (selectedDuration === 'All') return true;
      if (selectedDuration === 'Short-term') return course.duration < 30;
      if (selectedDuration === 'Medium-term') return course.duration >= 30 && course.duration <= 50;
      if (selectedDuration === 'Long-term') return course.duration > 50;
    });

  const categories = [
    'All',
    'Computer Desktop Publishing',
    'Graphic Design',
    'UI/UX Design',
    'Website Development',
    'Application Development',
    'Game Development',
    '3D Modeling',
    'AI',
    'Data Science',
    'Data Analysis or Data Analytics',
    'Data Entry',
    'Cybersecurity',
    'Network Engineering',
    'Data Engineering',
    'Software Development',
    'Software Engineering (ADSE)',
    'Cloud Computing',
    'Robotics Studies',
    'Animation',
    'Python Programming',
  ];

  const priceFilters = ['All', 'Free', 'Paid'];
  const durationFilters = ['All', 'Short-term', 'Medium-term', 'Long-term'];

  return (
    <div className="relative flex flex-col md:flex-row">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block md:w-1/4 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Filters</h2>
        <div className="space-y-4">
          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold">Category</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer py-2 px-4 rounded-lg ${
                    selectedCategory === category
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="text-lg font-semibold">Price</h3>
            <ul className="space-y-2">
              {priceFilters.map((price) => (
                <li
                  key={price}
                  className={`cursor-pointer py-2 px-4 rounded-lg ${
                    selectedPrice === price
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedPrice(price)}
                >
                  {price}
                </li>
              ))}
            </ul>
          </div>

          {/* Duration Filter */}
          <div>
            <h3 className="text-lg font-semibold">Duration</h3>
            <ul className="space-y-2">
              {durationFilters.map((duration) => (
                <li
                  key={duration}
                  className={`cursor-pointer py-2 px-4 rounded-lg ${
                    selectedDuration === duration
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedDuration(duration)}
                >
                  {duration}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Horizontal Filters for smaller screens */}
      <div className="block md:hidden bg-gray-900 text-white p-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          <select
            className="bg-gray-800 text-white rounded px-2 py-1"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="bg-gray-800 text-white rounded px-2 py-1"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            {priceFilters.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
          <select
            className="bg-gray-800 text-white rounded px-2 py-1"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            {durationFilters.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-6">Explore Our Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center text-lg font-semibold text-gray-600">
              No courses available in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
