import React from 'react'
import { FaStarOfLife, FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Course = ({course}) => {
  return (
    <Link to={`/courses/${course._id}`} >   
     <div className="w-[300px] flex flex-shrink-0 flex-col cursor-pointer">
          <div className="w-full h-[200px]">
            <img
              src={course.thumbnail}
              alt="course"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3>{course.title}</h3>
            <div className="flex items-center justify-start gap-5">
              <p className="flex items-center gap-2">
                4/5 <FaStarOfLife className="text-yellow-500" />
              </p>
              <FaCartPlus className="text-red-600" />
            </div>
            <div className="flex items-center justify-between gap-5">
              <p className="bg-gray-100 px-2 py-1 rounded-md w-[50%]">{course.instructor.username}</p>
              <p className="bg-gray-100 px-2 py-1 rounded-md w-[50%]">5 Students</p>
            </div>
          </div>
        </div>
        </Link>

  )
}

export default Course