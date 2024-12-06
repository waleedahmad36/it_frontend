import React, { useState } from "react";
import { FaFileImage, FaVideo, FaFilePdf } from "react-icons/fa";
import Select from "react-select";
import { useCreateCourseMutation } from "../../features/api/courseApi";
import toast from "react-hot-toast";

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

const CourseCreationForm = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [createCourse] = useCreateCourseMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: null,
    instructor: user._id,
    isPaid: false,
    price: 0,
    discountPrice: 0,
    duration: "",
  });

  const [files, setFiles] = useState({
    thumbnail: null,
    video: null,
    pdf: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category.value);
    data.append("instructor", formData.instructor);
    data.append("isPaid", formData.isPaid);
    data.append("price", formData.price);
    data.append("discountPrice", formData.discountPrice);
    data.append("duration", formData.duration);

    if (files.thumbnail) data.append("thumbnail", files.thumbnail);
    if (files.video) data.append("video", files.video);
    if (files.pdf) data.append("pdf", files.pdf);

    try {
      setLoading(true);
      await createCourse(data).unwrap();
      toast.success("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="p-8 space-y-6 bg-gray-800 text-white rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">Create a Course</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        ></textarea>
        <Select
          options={categories}
          value={formData.category}
          onChange={(selected) =>
            setFormData({ ...formData, category: selected })
          }
          placeholder="Select a Category"
          className="text-black"
        />
        <div className="flex items-center">
          <label className="mr-2">Is Paid:</label>
          <input
            type="checkbox"
            name="isPaid"
            checked={formData.isPaid}
            onChange={() =>
              setFormData({ ...formData, isPaid: !formData.isPaid })
            }
          />
        </div>
        {formData.isPaid && (
          <>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700"
            />
            <input
              type="number"
              name="discountPrice"
              placeholder="Discount Price"
              value={formData.discountPrice}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700"
            />
          </>
        )}
        <input
          type="number"
          name="duration"
          placeholder="Duration (in days)"
          value={formData.duration}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <FaFileImage className="text-2xl text-green-500" />
          <label className="w-full">
            <span className="bg-gray-900 text-white px-4 py-2 rounded cursor-pointer">
              Upload Thumbnail
            </span>
            <input
              type="file"
              name="thumbnail"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        {files.thumbnail && (
          <div className="flex justify-center">
            <img
              src={URL.createObjectURL(files.thumbnail)}
              alt="Thumbnail Preview"
              className="w-40 h-40 rounded-lg object-cover mt-2"
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <FaVideo className="text-2xl text-blue-500" />
          <label className="w-full">
            <span className="bg-gray-900 text-white px-4 py-2 rounded cursor-pointer">
              Upload Video
            </span>
            <input
              type="file"
              name="video"
              onChange={handleFileChange}
              className="hidden"
              accept="video/*"
            />
          </label>
        </div>
        {files.video && (
          <div className="flex justify-center">
            <video
              controls
              className="w-40 h-40 rounded-lg mt-2"
              src={URL.createObjectURL(files.video)}
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <FaFilePdf className="text-2xl text-red-500" />
          <label className="w-full">
            <span className="bg-gray-900 text-white px-4 py-2 rounded cursor-pointer">
              Upload PDF
            </span>
            <input
              type="file"
              name="pdf"
              onChange={handleFileChange}
              className="hidden"
              accept="application/pdf"
            />
          </label>
        </div>
        {files.pdf && (
          <div className="flex justify-center mt-2">
            <iframe
              src={URL.createObjectURL(files.pdf)}
              className="w-40 h-40 rounded-lg"
              title="PDF Preview"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 rounded text-white"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CourseCreationForm;
