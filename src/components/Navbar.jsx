import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md border-b border-blue-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo/Brand */}
                    <Link
                        to="/"
                        className="flex items-center text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-400 bg-clip-text text-transparent"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        BlogApp
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <>
                                <Link
                                    to="/"
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/create"
                                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300"
                                >
                                    Create Post
                                </Link>
                                <Link
                                    to="/profile"
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                                >
                                    Profile
                                </Link>
                                <span className="text-gray-600 font-medium">
                                    {user.name || user.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 text-white px-5 py-2 rounded-lg shadow hover:from-blue-700 hover:via-purple-700 hover:to-blue-600 transition-colors duration-300 text-sm font-semibold"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-blue-600 hover:text-purple-600 focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-inner border-t border-blue-200">
                    <div className="px-6 pt-4 pb-6 space-y-3">
                        {user ? (
                            <>
                                <Link
                                    to="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/create"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-gray-700 hover:text-purple-600 font-medium"
                                >
                                    Create Post
                                </Link>
                                <Link
                                    to="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Profile
                                </Link>
                                <div className="text-gray-600 font-medium">
                                    {user.name || user.username}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 text-white px-5 py-2 rounded-md text-sm font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-blue-600"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
