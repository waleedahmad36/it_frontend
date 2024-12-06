import React, { useState } from 'react';
import { useAddCourseToPlaylistMutation, useGetAllPlaylistsQuery } from '../../features/api/playlistApi';

const AddCourseToPlaylist = ({ courseId , userId }) => {
  const { data: playlists } = useGetAllPlaylistsQuery();
  const [addCourseToPlaylist] = useAddCourseToPlaylistMutation();
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  const handleAddCourse = async () => {
    try {
      await addCourseToPlaylist({ playlistId: selectedPlaylist, courseId }).unwrap();
      alert('Course added to playlist successfully!');
    } catch (error) {
      console.error('Error adding course to playlist:', error);
      alert('Failed to add course to playlist.');
    }
  };

  return (
    <div>
      <select value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)} className="w-full p-2 rounded bg-gray-700">
        <option value="">Select Playlist</option>
        {playlists?.playlists?.map((playlist) => (
          userId === playlist.instructor._id && (
            <option key={playlist._id} value={playlist._id}>{playlist.title}</option>
          )
        ))}
      </select>
      <button onClick={handleAddCourse} className="px-4 py-2 bg-blue-500 rounded text-white mt-2">
        Add Course to Playlist
      </button>
    </div>
  );
};

export default AddCourseToPlaylist;
