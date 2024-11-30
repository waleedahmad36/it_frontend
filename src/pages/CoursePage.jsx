import React from 'react'
import CreateCourse from '../Components/CreateCourse'
import AllCourses from '../Components/Courses/AllCourses'

const CoursePage = ({user}) => {
  return (
    <>
    {/* <CreateCourse user={user}/> */}

    <AllCourses/>
    </>
  )
}

export default CoursePage