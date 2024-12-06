import React from 'react';
import './Feauture.css';
import { Link} from 'react-router-dom';


const Features = ({user}) => {
  return (
    <>
        <div className="flex flex-col lg:flex-row justify-between items-center px-6 md:px-16 py-10 min-h-screen max-w-[1250px] mx-auto">
      {/* Left Section */}
      <div className="flex flex-col gap-4 max-w-lg text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Find video courses on almost any topic to build your career.
        </h1>
        <p className="text-gray-600">
          Enjoy lifetime access to courses on our website and app.
        </p>
        <Link to="/courses" className="text-blue-500 underline">
          View All Courses
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-8 lg:mt-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <div className="w-[260px] h-[310px] feature1-bg rounded-lg relative">
            <a href='#topcourse' >
            <button className="bg-white py-4 md:py-8 w-[85%] rounded-lg text-black font-bold absolute bottom-8 left-1/2 -translate-x-1/2 hover:bg-red-500 hover:text-white transition-all duration-300">
              Our Top Courses
            </button>
            </a>
          </div>

         
          <div className="w-[260px] h-[290px] bg-red-500 rounded-lg relative cursor-pointer hover:scale-105 transition-all duration-300">
          <Link to='/courses' > 
            <h3 className="text-white font-bold text-xl md:text-2xl text-center absolute bottom-8 left-1/2 -translate-x-1/2">
              Browse <br />
              all of <br />
              Categories
            </h3>
            </Link>
          </div>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <div className="w-[260px] h-[290px] feature2-bg rounded-lg relative">

            {
              user.role === 'student' && (
                <Link to={'/quiz'} >            <button className="bg-white py-4 md:py-8 w-[85%] rounded-lg text-black font-bold absolute bottom-8 left-1/2 -translate-x-1/2 hover:bg-red-500 hover:text-white transition-all duration-300">
                Apply for Certificate
              </button>
              </Link>
              )
            }

            {
              user.role !== 'student' && (
                <Link to={'/courses/create'} >            <button className="bg-white py-4 md:py-8 w-[85%] rounded-lg text-black font-bold absolute bottom-8 left-1/2 -translate-x-1/2 hover:bg-red-500 hover:text-white transition-all duration-300">
                Add more courses
              </button>
              </Link>
              )
            }

          </div>
          <div className="w-[260px] h-[310px] feature3-bg rounded-lg relative">
            <button className="bg-white py-4 md:py-8 w-[85%] rounded-lg text-black font-bold absolute bottom-8 left-1/2 -translate-x-1/2 hover:bg-red-500 hover:text-white transition-all duration-300">
              <Link to={'/playlist'} >Playlists</Link>
            </button>
          </div>
        </div>
      </div>
    </div>





<div  className='w-full bg-cover-hist mt-10 min-h-[80vh] text-white flex justify-center lg:justify-start items-center px-4 md:px-20 py-10' >
    <div  className='flex flex-col gap-8 max-w-2xl ' >
        <h1 className='text-3xl md:text-6xl font-extrabold shadow-xl  '>
        Limitless learning and more possibilities
        </h1>
        <p>
        Choose from over 100,000 online video courses with new
        </p>

        <Link to="/instructors" className='bg-red-600 text-white px-4 py-3 rounded-md max-w-fit hover:bg-black hover:text-white transition-all duration-300'>
        Find Our Instructors
        </Link>
    </div>
    </div>


    </>

  );
};

export default Features;
