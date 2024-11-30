import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../constants';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeContent, setActiveContent] = useState('thumbnail'); // 'thumbnail', 'video', or 'pdf'

  const getCourseById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/v1/course/${id}`, {
        withCredentials: true,
      });
      setCourse(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getCourseById();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {loading ? (
        <div className="text-2xl font-semibold text-gray-600 animate-pulse text-center">
          Loading...
        </div>
      ) : course ? (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 bg-white shadow-lg rounded-lg p-6">
          {/* Left Section: Title, Description, and Details */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
            <p className="text-gray-600 text-lg">{course.description}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-700">Category:</span>
                <p className="text-gray-600">{course.category || 'Education'}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-700">Status:</span>
                <p
                  className={`text-sm px-3 py-1 rounded-full ${
                    course.isPublished ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'
                  }`}
                >
                  {course.isPublished ? 'Published' : 'Unpublished'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-700">Price:</span>
                <p
                  className={`text-sm px-3 py-1 rounded-full ${
                    course.isPaid ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                  }`}
                >
                  {course.isPaid ? 'Paid Course' : 'Free Course'}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
                onClick={() => setActiveContent('video')}
              >
                Watch Video
              </button>
              {course.pdfUrl && (
                <button
                  className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
                  onClick={() => setActiveContent('pdf')}
                >
                  View PDF
                </button>
              )}
            </div>
          </div>

          {/* Right Section: Thumbnail, Video, or PDF */}
          <div className="lg:w-1/2 space-y-4">
            <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              {activeContent === 'thumbnail' && (
                <img
                  src={course.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              )}
              {activeContent === 'video' && (
                <video
                  controls
                  className="w-full h-full"
                  poster={course.thumbnail}
                >
                  <source src={course.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {activeContent === 'pdf' && (
                <iframe
                  src={course.pdfUrl}
                  title="PDF Viewer"
                  className="w-full h-full"
                ></iframe>
              )}
            </div>
            {/* Instructor Details */}
            <div className="p-4 bg-gray-50 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700 mb-2">Instructor</h2>
              <p className="text-gray-600">{course.instructor?.username}</p>
              <p className="text-gray-500">{course.instructor?.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-2xl font-semibold text-gray-600 text-center">
          Course not found
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
