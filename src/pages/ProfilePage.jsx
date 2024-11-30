import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn } from '../features/authSlice';
import { useUpdateUserMutation } from '../features/api/authApi';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePic, setProfilePic] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // To hold the preview image
  const [imageChanged, setImageChanged] = useState(false); // Track if the image has been changed

  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();

  // Default avatar if no profile pic is available
  const defaultAvatar = 'https://api.dicebear.com/6.x/bottts/svg?seed=defaultAvatar';

  useEffect(() => {
    if (profilePic) {
      const objectUrl = URL.createObjectURL(profilePic);
      setImagePreview(objectUrl);
      setImageChanged(true); // Mark that the user has selected a new image
      return () => URL.revokeObjectURL(objectUrl); // Clean up the object URL when the component unmounts or the profilePic changes
    }
    setImagePreview(null); // Reset the preview if no file is selected
    setImageChanged(false); // Reset the change flag if no image is selected
  }, [profilePic]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const response = await updateUser(formData).unwrap();
      dispatch(userLoggedIn({ user: response.user }));
      alert('Profile updated successfully!');
      setImageChanged(false); // Reset image change state after update
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const handleCancel = () => {
    setProfilePic(null); // Reset the profile picture
    setImagePreview(null); // Reset the preview
    setImageChanged(false); // Reset the image changed flag
  };

  return (
    <>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Your Profile</h1>
      
      {/* Profile Picture Section */}
      <div className="flex justify-center mb-6">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile Preview"
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
          />
        ) : (
          <img
            src={user?.profilePic || defaultAvatar}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
          />
        )}
      </div>

      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-lg font-medium text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="bio" className="text-lg font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="profilePic" className="text-lg font-medium text-gray-700">Profile Picture</label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="mt-2 border border-gray-300 rounded-lg p-2"
          />
          
          {/* Cancel button if image has changed */}
          {imageChanged && (
            <div className="mt-4 flex justify-center space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 px-4 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 w-full py-3 px-6 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ProfilePage;
