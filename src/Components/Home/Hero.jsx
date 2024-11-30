import React from 'react';
import './Hero.css';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="relative w-full  h-[130vh] lg:h-[120vh]">
      {/* Hero Background Section */}
      <div className="relative w-full hero-bg pt-10">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start px-6 md:px-20 py-10 h-[90vh] max-w-[1200px] mx-auto  ">
          {/* Left Section */}
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-white text-4xl md:text-6xl font-bold shadow-xl leading-tight">
              For every student, every classroom. Real results.
            </h1>
            <div className="flex items-center gap-4 bg-white rounded-md px-4 py-2 mt-6 mx-auto md:mx-0 max-w-lg">
              <FaSearch className="text-xl text-blue-500" />
              <input
                className="bg-transparent outline-none flex-1"
                placeholder="Search for anything"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="mt-8 md:mt-0 min-w-[300px]  flex-1">
            <img
              src="/laptop.png"
              alt="laptop"
              className="min-w-[300px] min-h-[300px] object-center"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="absolute bottom-[5vh]  md:bottom-[3vh] lg:bottom-[5vh] w-full h-auto md:h-[40vh] bg-white shadow-2xl max-w-5xl left-1/2 transform -translate-x-1/2 rounded-3xl flex flex-col md:flex-row items-center px-6 md:px-10 py-6 space-y-6 md:space-y-0 lg:space-x-10">
        {/* Feature Item 1 */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div>
            <IoMdCheckmarkCircleOutline className="text-4xl text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">50K+ Online Courses</h1>
            <p className="text-sm md:text-base text-gray-600">
              Enjoy lifetime access to courses
            </p>
          </div>
        </div>

        {/* Feature Item 2 */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div>
            <IoMdCheckmarkCircleOutline className="text-4xl text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Learn at Your Own Pace</h1>
            <p className="text-sm md:text-base text-gray-600">
              Study anytime, anywhere
            </p>
          </div>
        </div>

        {/* Feature Item 3 */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div>
            <IoMdCheckmarkCircleOutline className="text-4xl text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Expert Instructors</h1>
            <p className="text-sm md:text-base text-gray-600">
              Learn from industry leaders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
