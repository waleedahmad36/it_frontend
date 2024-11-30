import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogoutUserMutation } from '../features/api/authApi'; // Import the logout mutation
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [logoutUser] = useLogoutUserMutation(); // Use the hook
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

    const handleLogout = async () => {
        setLoading(true);
        try {
            // Dispatch the logout mutation from Redux
            await logoutUser().unwrap(); // .unwrap() is used to access the result of the mutation
            window.location.href = "/login"; // Redirect after successful logout
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const defaultProfilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    return (
        <>
            <div className='flex justify-between items-center px-4 py-3 sticky top-0 z-50 bg-white/80 backdrop-blur-sm'>
                <Link to="/">
                    <img src='/logo.png' alt='logo' className='w-20 h-20' />
                </Link>

                <div className='gap-8 items-center text-lg font-medium hidden lg:flex'>
                    <Link to="/" className='hover:text-red-600'>Home</Link>
                    <Link to="/courses" className='hover:text-red-600'>Courses</Link>
                    <Link to="/about" className='hover:text-red-600'>About</Link>
                    <Link to="/contact" className='hover:text-red-600'>Contact</Link>
                </div>

                <div className='flex gap-4 items-center relative'>
                    {user && (
                        <div className='relative'>
                            {/* Profile Picture */}
                            <img
                                src={user.profilePic || defaultProfilePic}
                                alt='user'
                                className='w-10 h-10 rounded-full cursor-pointer'
                                onClick={toggleDropdown} // Toggle the dropdown menu
                            />

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md'>
                                    <Link
                                        to="/profile"
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                                        onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                                    >
                                        Profile
                                    </Link>
                                    {user.role === 'student' && (
                                        <Link
                                        to="/enrolled-courses"
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                                        onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                                    >
                                        Enrolled Courses
                                    </Link>
                                    )}

                                    {
                                        user.role !== 'student' && (
                                            <Link
                                            to="/courses/create"
                                            className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                                            onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                                        >
                                            Create Course
                                        </Link>
                                        )
                                    }
                                    
                                    {
                                        user.role !== 'student' && (
                                            <Link
                                        to={`/${user.role}/dashboard`}
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                                        onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                                    >
                                        Dashboard
                                    </Link>
                                        )
                                    }
                                    
                                </div>
                            )}
                        </div>
                    )}
                    <button onClick={handleLogout} className='bg-red-500 px-4 py-2 rounded-md border-none outline-none text-white'>
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
