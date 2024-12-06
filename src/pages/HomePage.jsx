import React from 'react'
import Hero from '../Components/Home/Hero'
import Features from '../Components/Home/Features'
import TopCourses from '../Components/Home/TopCourses'
import Footer from '../Components/Home/Footer'
const HomePage = ({user}) => {
  return (
    <>
    <Hero/>
    <Features  user={user} />
    <TopCourses/>
    {/* <Footer/> */}
    </>
  )
}

export default HomePage