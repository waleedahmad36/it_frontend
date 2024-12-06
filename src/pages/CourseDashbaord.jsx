import React from 'react';
import { useGetAllCoursesQuery } from '../features/api/courseApi';
import { useGetAllPlaylistsQuery } from '../features/api/playlistApi';
import AddCourseToPlaylist from '../Components/Courses/AddCourseToPlaylist';
import CourseCreationForm from '../Components/Courses/CourseCreateForm';
import PlaylistCreationForm from '../Components/Courses/PlaylistCreationForm';
import Course from '../Components/Courses/Course';

const Dashboard = ({user}) => {
  const { data: courses } = useGetAllCoursesQuery();
  const { data: playlists } = useGetAllPlaylistsQuery();


  console.log(courses.courses[0].instructor._id === user._id)


  console.log('playlists are',playlists)


  console.log('courses are', courses)

  return (
    <>
        <div className="p-8 space-y-6 bg-gray-800 text-white rounded-lg">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <section>
        <h2 className="text-xl">Courses</h2>
        <div   className='flex justify-start gap-4 flex-wrap' >
        {courses?.courses?.map((course) => (
          user._id ===course.instructor._id  && (
            <div key={course._id} className="flex flex-col items-center border rounded-lg p-2 border-gray-900 gap-2 mt-5">
            {/* <h3 className="text-lg font-bold">{course.title}</h3>
            <p>{course.description}</p> */}
            <Course course={course}  />
            <AddCourseToPlaylist courseId={course._id} userId={user?._id}/>
          </div>
          )
        ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl">Playlists</h2>
        {playlists?.playlists?.map((playlist) => (
          user._id === playlist.instructor._id && (
            <div key={playlist._id} className="border p-4 rounded my-2">
            <h3 className="text-lg font-bold">{playlist.title}</h3>
            <p>{playlist.description}</p>
          </div>
          )
        ))}
      </section>
    </div>


    <PlaylistCreationForm   user={user} />

    </>

  );
};

export default Dashboard;
