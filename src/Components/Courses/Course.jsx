import React, { useState } from "react";
import { FaStarOfLife, FaCartPlus, FaEdit, FaTimes, FaFileUpload, FaVideo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useUpdateCourseMutation ,  useGetAllCoursesQuery} from "../../features/api/courseApi"; // Redux action for course update
import { motion } from "framer-motion"; // Importing framer-motion for animations
import toast from "react-hot-toast"; // Import react-hot-toast for notifications
import Select from 'react-select'

const Course = ({ course }) => {

  const categories = [
    { value: "All", label: "All" },
    { value: "Computer Desktop Publishing", label: "Computer Desktop Publishing" },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Website Development", label: "Website Development" },
    { value: "Application Development", label: "Application Development" },
    { value: "Game Development", label: "Game Development" },
    { value: "3D Modeling", label: "3D Modeling" },
    { value: "AI", label: "AI" },
    { value: "Data Science", label: "Data Science" },
    { value: "Data Analysis or Data Analytics", label: "Data Analysis or Data Analytics" },
    { value: "Data Entry", label: "Data Entry" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Network Engineering", label: "Network Engineering" },
    { value: "Data Engineering", label: "Data Engineering" },
    { value: "Software Development", label: "Software Development" },
    { value: "Software Engineering (ADSE)", label: "Software Engineering (ADSE)" },
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "Robotics Studies", label: "Robotics Studies" },
    { value: "Animation", label: "Animation" },
    { value: "Python Programming", label: "Python Programming" },
  ];

  
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({ ...course });
  const [files, setFiles] = useState({ thumbnail: null, video: null, pdf: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(""); // Feedback message
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const {refetch }  =  useGetAllCoursesQuery();

  const handleEditClick = () => {
    setUpdatedCourse({ ...course });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFiles({ thumbnail: null, video: null, pdf: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFiles((prevFiles) => ({ ...prevFiles, [name]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    const formData = new FormData();
    Object.keys(updatedCourse).forEach((key) => {
      if (updatedCourse[key] !== undefined && updatedCourse[key] !== null) {
        formData.append(key, updatedCourse[key]);
      }
    });

    if (files.thumbnail) formData.append("thumbnail", files.thumbnail);
    if (files.video) formData.append("video", files.video);
    if (files.pdf) formData.append("pdf", files.pdf);

    try {
      const response = await updateCourse({ id: course._id, courseData: formData }).unwrap();
      refetch();
      toast.success("Course updated successfully!"); // Show success toast
      setUpdatedCourse(response); 
      setIsSubmitting(false);
      setIsModalOpen(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* Course Card */}
      <div className="w-[300px] flex flex-col cursor-pointer relative group flex-shrink-0">
        <Link to={`/courses/${course._id}`} className="absolute inset-0 z-0"></Link>
        {user._id === course.instructor._id && (
          <FaEdit
            onClick={handleEditClick}
            className="absolute top-2 right-2 text-gray-700 hover:text-blue-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ zIndex: 10 }}
          />
        )}
        <div className="w-full h-[200px] overflow-hidden">
          <img
            src={course.thumbnail}
            alt="course"
            className="w-full h-full object-cover scale-105 hover:scale-100 duration-300 ease-in-out"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <div className="flex items-center justify-start gap-5">
            <p className="flex items-center gap-2 text-yellow-500">
              4/5 <FaStarOfLife />
            </p>
            <FaCartPlus className="text-red-600" />
          </div>
          <div className="flex items-center justify-between gap-5">
            <p className="border border-gray-900 px-2 py-1 rounded-md">
              {course.instructor.username}
            </p>
            <p className="border border-gray-900 px-2 py-1 rounded-md">5 Students</p>
          </div>
        </div>
      </div>

      {/* Edit Course Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-black/80 p-6 rounded-md w-full max-w-3xl shadow-lg relative h-[90vh] overflow-y-scroll">
            <FaTimes
              onClick={handleModalClose}
              className="absolute top-8 right-8 text-gray-600 cursor-pointer text-xl"
            />
            <h2 className="text-2xl mb-4 font-semibold text-center">Edit Course</h2>
            {message && <div className="text-center text-red-500 mb-4">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium">Course Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={updatedCourse.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={updatedCourse.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                ></textarea>
              </div>

              {/* Category */}
              <div>
              <Select
    name="category"
    options={categories}
    value={categories.find((option) => option.value === updatedCourse.category)} // Match category
    onChange={(selectedOption) =>
      setUpdatedCourse((prev) => ({
        ...prev,
        category: selectedOption ? selectedOption.value : "", // Update value properly
      }))
    }
    placeholder="Select a Category"
    className="text-black"
  />
                
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium">Duration</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={updatedCourse.duration}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* File Inputs with Icons */}
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium">Thumbnail</label>
                <div className="flex items-center justify-between border p-2 rounded-md">
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    onChange={handleFileChange}
                    className="w-full p-2 hidden"
                  />
                  <label
                    htmlFor="thumbnail"
                    className="flex items-center gap-2 text-blue-600 cursor-pointer"
                  >
                    <FaFileUpload />
                    Choose File
                  </label>
                </div>
                {files.thumbnail ? (
                  <img src={URL.createObjectURL(files.thumbnail)} alt="Thumbnail preview" className="w-24 h-24 mx-auto mt-2 rounded-md" />
                ) : (
                  updatedCourse.thumbnail && <img src={updatedCourse.thumbnail} alt="Existing Thumbnail" className="w-24 h-24 mx-auto mt-2 rounded-md" />
                )}
              </div>

              <div>
                <label htmlFor="video" className="block text-sm font-medium">Video</label>
                <div className="flex items-center justify-between border p-2 rounded-md">
                  <input
                    type="file"
                    id="video"
                    name="video"
                    onChange={handleFileChange}
                    className="w-full p-2 hidden"
                  />
                  <label
                    htmlFor="video"
                    className="flex items-center gap-2 text-blue-600 cursor-pointer"
                  >
                    <FaVideo />
                    Choose File
                  </label>
                </div>
                {files.video && (
                  <p className="text-sm text-gray-500 mt-2">Video: {files.video.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="pdf" className="block text-sm font-medium">PDF</label>
                <div className="flex items-center justify-between border p-2 rounded-md">
                  <input
                    type="file"
                    id="pdf"
                    name="pdf"
                    onChange={handleFileChange}
                    className="w-full p-2 hidden"
                  />
                  <label
                    htmlFor="pdf"
                    className="flex items-center gap-2 text-blue-600 cursor-pointer"
                  >
                    <FaFileUpload />
                    Choose File
                  </label>
                </div>
                {files.pdf && (
                  <p className="text-sm text-gray-500 mt-2">PDF: {files.pdf.name}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`w-full bg-blue-600 text-white p-3 rounded-md font-medium ${
                  isSubmitting || isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting || isLoading ? "Updating..." : "Update Course"}
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Course;
