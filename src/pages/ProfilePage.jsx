import React, { useState, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn } from '../features/authSlice';
import { useUpdateUserMutation } from '../features/api/authApi';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import InstructorCourses from '../Components/Courses/OwnCourses';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePic, setProfilePic] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track edit state

  const sigCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 90, aspect: 3 / 1 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const defaultAvatar = 'https://api.dicebear.com/6.x/bottts/svg?seed=defaultAvatar';

  useEffect(() => {
    if (profilePic) {
      const objectUrl = URL.createObjectURL(profilePic);
      setImagePreview(objectUrl);
      setImageChanged(true);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setImagePreview(null);
    setImageChanged(false);
  }, [profilePic]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);

    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    if (sigCanvasRef.current) {
      const signatureDataUrl = sigCanvasRef.current.toDataURL('image/png');
      const signatureToSend = croppedImageUrl || signatureDataUrl;
      let signatureFile = dataUrlToFile(signatureToSend, 'signature.png');
      formData.append('signature', signatureFile);
    }


    setLoading(true);
    try {
      const response = await updateUser(formData).unwrap();
      setLoading(false)
      dispatch(userLoggedIn({ user: response.user }));
      toast.success('Profile Updated Successfully')
      setImageChanged(false);
      setIsEditing(false); // Exit edit mode after update
    } catch (error) {
      console.error('Profile update failed:', error);
      setLoading(false)
    }
  };

  const handleClearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
    setCroppedImageUrl(null);
  };

  const dataUrlToFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const handleCropChange = (crop) => {
    setCrop(crop);
  };

  const handleCropComplete = (crop) => {
    if (sigCanvasRef.current) {
      const canvas = sigCanvasRef.current.getCanvas();
      const context = canvas.getContext('2d');
      const imageData = context.getImageData(crop.x, crop.y, crop.width, crop.height);
      const croppedCanvas = document.createElement('canvas');
      const croppedContext = croppedCanvas.getContext('2d');

      croppedCanvas.width = crop.width;
      croppedCanvas.height = crop.height;
      croppedContext.putImageData(imageData, 0, 0);

      const croppedDataUrl = croppedCanvas.toDataURL('image/png');
      setCroppedImageUrl(croppedDataUrl);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      {/* Profile Overview */}
      <div className="flex justify-center mb-6">
        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile Preview"
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
          />
        ) : (
          <img
            src={defaultAvatar}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
          />
        )}
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">{user?.username}</h1>
        <p className="text-lg text-gray-600 mb-4">{user?.bio || 'No bio available'}</p>
        <p className="text-gray-500">Email: {user?.email}</p>
        {user?.signature && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700">Signature</h3>
            <img
              src={user.signature}
              alt="User Signature"
              className="w-full h-32 object-contain border border-gray-300 rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Toggle Profile Edit */}
      {!isEditing ? (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsEditing(true)}
            className="py-2 px-6 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleProfileUpdate} className="space-y-6 mt-6">
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
            {imageChanged && (
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setProfilePic(null);
                    setImagePreview(null);
                    setImageChanged(false);
                  }}
                  className="py-2 px-4 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Signature Section */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">Signature</label>
            <SignatureCanvas
              ref={sigCanvasRef}
              canvasProps={{
                className: 'border border-gray-300 rounded-lg w-full h-40',
              }}
            />
            <ReactCrop
              src={croppedImageUrl || sigCanvasRef.current?.toDataURL('image/png')}
              crop={crop}
              onChange={handleCropChange}
              onComplete={handleCropComplete}
              className="mt-4"
            />
            <button
              type="button"
              onClick={handleClearSignature}
              className="mt-4 py-2 px-4 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Clear Signature
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {loading ? 'Saving...'  : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* Instructor's Courses */}
      <div className="mt-12">
        <InstructorCourses user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
