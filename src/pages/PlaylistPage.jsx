import React, { useState } from 'react';
import { useGetAllPlaylistsQuery, useGetPlaylistByIdQuery } from '../features/api/playlistApi'; // Adjust path as needed
import { Modal } from 'react-responsive-modal'; // Optional: Install react-responsive-modal or use your preferred modal library
import 'react-responsive-modal/styles.css';
import Course from '../Components/Courses/Course';

const PlaylistPage = () => {
  const { data: playlists, isLoading, error } = useGetAllPlaylistsQuery();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const { data: selectedPlaylist } = useGetPlaylistByIdQuery(selectedPlaylistId, {
    skip: !selectedPlaylistId, // Skip query if no playlist is selected
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (id) => {
    setSelectedPlaylistId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlaylistId(null);
    setModalOpen(false);
  };

  if (isLoading) return <div className="text-center text-2xl">Loading playlists...</div>;
  if (error) return <div className="text-center text-red-500">Failed to load playlists</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10 px-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Your Playlists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {playlists?.playlists?.map((playlist) => (
          <div
            key={playlist._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => openModal(playlist._id)}
          >
            <h2 className="text-2xl font-semibold text-gray-800">{playlist.title}</h2>
            <p className="text-gray-600 mt-2 mb-4">{playlist.description || 'No description available'}</p>
            {playlist.thumbnail && (
              <div className="rounded-lg overflow-hidden">
                <img src={playlist.thumbnail} alt="Playlist Thumbnail" className="w-full h-48 object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Playlist Details */}
      <Modal open={isModalOpen} onClose={closeModal} center>
        <div className="p-6 space-y-6">
          {selectedPlaylist ? (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedPlaylist.playlist.title}</h2>
              <p className="text-gray-600 mb-6">{selectedPlaylist.playlist.description || 'No description available'}</p>
              <div className="space-y-4">
                {selectedPlaylist.playlist.courses?.map((course) => (
                  <div
                    key={course._id}
                    className="p-4 bg-white rounded-lg shadow-md"
                  >
                    <Course course={course} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-xl text-gray-600">Loading playlist details...</div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PlaylistPage;
