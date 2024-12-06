import React, { useState, useEffect } from 'react';

import { FaFileImage } from 'react-icons/fa';
import { useGetAllCoursesQuery } from '../../features/api/courseApi';
import { useCreatePlaylistMutation } from '../../features/api/playlistApi';

const PlaylistCreationForm = ({ user }) => {
  const [createPlaylist] = useCreatePlaylistMutation();
  const { data: allCourses } = useGetAllCoursesQuery();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: user._id,
    courses: [],
  });
  const [files, setFiles] = useState({ thumbnail: null });
  const [filePreviews, setFilePreviews] = useState({ thumbnail: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      setFilePreviews({ ...filePreviews, [name]: URL.createObjectURL(file) });
      setFiles({ ...files, [name]: file });
    }
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, courses: Array.from(e.target.selectedOptions, (option) => option.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('instructor', formData.instructor);
    data.append('courses', JSON.stringify(formData.courses));

    if (files.thumbnail) data.append('thumbnail', files.thumbnail);

    try {
      await createPlaylist(data).unwrap();
      alert('Playlist created successfully!');
    } catch (error) {
      console.error('Error creating playlist:', error);
      alert('Failed to create playlist.');
    }
  };

  return (
    <form className="p-8 space-y-6 bg-gray-800 text-white rounded-lg" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Create a Playlist</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Playlist Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        />
        <textarea
          name="description"
          placeholder="Playlist Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        ></textarea>
        <div className="flex items-center justify-between">
          <label htmlFor="thumbnail" className="cursor-pointer flex items-center">
            <FaFileImage className="mr-2" />
            {filePreviews.thumbnail ? (
              <img src={filePreviews.thumbnail} alt="Thumbnail Preview" className="w-16 h-16 object-cover rounded" />
            ) : (
              <span>Thumbnail</span>
            )}
          </label>
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <select multiple name="courses" value={formData.courses} onChange={handleCourseChange} className="w-full p-2 rounded bg-gray-700">
          {allCourses?.allcourses?.map((course) => (
            <option key={course._id} value={course._id}>{course.title}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="w-full px-4 py-2 bg-green-500 rounded text-white">
        Submit Playlist
      </button>
    </form>
  );
};

export default PlaylistCreationForm;
