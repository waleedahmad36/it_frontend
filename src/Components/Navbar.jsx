import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogoutUserMutation } from '../features/api/authApi';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaBook, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [logoutUser] = useLogoutUserMutation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutUser().unwrap();
            window.location.href = "/login";
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

    const navItems = [
        { to: "/", label: "Home", icon: <FaHome /> },
        { to: "/courses", label: "Courses", icon: <FaBook /> },
        { to: "/about", label: "About", icon: <FaInfoCircle /> },
        { to: "/contact", label: "Contact", icon: <FaPhoneAlt /> },
    ];

    return (
        <>
            <div className='flex justify-between items-center px-4 py-3 sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-md'>
                {/* Logo */}
                <Link to="/">
                    <img src='/logo.png' alt='logo' className='w-20 h-20' />
                </Link>

                {/* Large screen navigation */}
                {user && (
                    <div className='gap-8 items-center text-lg font-medium hidden lg:flex'>
                        {navItems.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1, color: "#ef4444" }}
                                className='flex items-center gap-2 cursor-pointer'
                            >
                                <Link to={item.to} className='flex items-center gap-2 hover:text-red-600'>
                                    {item.icon}
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Profile and Menu Toggle */}
                <div className='flex gap-4 items-center relative'>
                    {/* Hamburger Menu (Small screens) */}
                    <button
                        className='lg:hidden p-2'
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <span className='block w-6 h-1 bg-black mb-1'></span>
                        <span className='block w-6 h-1 bg-black mb-1'></span>
                        <span className='block w-6 h-1 bg-black'></span>
                    </button>

                    {/* Profile Dropdown */}
                    {user && (
                        <div className='relative'>
                            <img
                                src={user.profilePic || defaultProfilePic}
                                alt='user'
                                className='w-10 h-10 rounded-full cursor-pointer'
                                onClick={toggleDropdown}
                            />
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md'
                                >
                                    <Link
                                        to="/profile"
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    {
                                        user.role === 'admin' && (
                                            <Link
                                        to="/admin/dashboard"
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Admin Dashboard
                                    </Link>
                                        )
                                    }
                                    {
                                        user.role !== 'student' && (
                                            <Link
                                        to="/manage/course"
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Manage Your Course
                                    </Link>
                                        )
                                    }
                                    {
                                        user.role === 'instructor' && (
                                            <Link
                                        to="/instructor/dashboard"
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                       Instructor Dashboard
                                    </Link>
                                        )
                                    }
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* Logout Button */}
                    {user && (
                        <button
                            onClick={handleLogout}
                            className='bg-red-500 px-4 py-2 rounded-md border-none outline-none text-white hidden lg:flex'
                        >
                            {loading ? "Logging out..." : "Logout"}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.4 }}
                        className='lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40'
                    >
                        <div className='flex flex-col gap-6 p-6 pt-32'> {/* Adjusted padding */}
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1, color: "#ef4444" }}
                                    className='flex items-center gap-2 cursor-pointer'
                                >
                                    <Link to={item.to} className='flex items-center gap-2 hover:text-red-600'>
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <button
                                onClick={handleLogout}
                                className='bg-red-500 px-4 py-2 rounded-md border-none outline-none text-white mt-4'
                            >
                                {loading ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
