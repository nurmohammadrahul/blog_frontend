import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, getMyBlogs } from "../features/blogs/blogSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);
    const { user } = useSelector((state) => state.auth);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getMyBlogs());
        return () => dispatch(reset());
    }, [dispatch]);

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100">
                <div className="text-blue-600 text-xl animate-pulse">Loading your blogs...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-blue-50 via-white to-blue-100">
                <div className="max-w-md p-8 bg-white border border-blue-200 rounded-2xl shadow-xl backdrop-blur-sm text-center">
                    <h3 className="text-2xl font-semibold text-red-600 mb-4">Error loading your blogs</h3>
                    <p className="text-blue-700 mb-6">{message || "Something went wrong."}</p>
                    <button
                        onClick={() => dispatch(getMyBlogs())}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition duration-200"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-blue-50 via-white to-blue-100">
                <div className="max-w-md p-8 bg-white border border-blue-200 rounded-2xl shadow-xl backdrop-blur-sm text-center">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">No blogs yet</h3>
                    <p className="text-blue-600 mb-6">Start sharing your thoughts and ideas!</p>
                    <button
                        onClick={() => navigate("/create-blog")}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition duration-200"
                    >
                        Create Your First Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                        My Blog Posts
                    </h2>
                    <p className="mt-2 text-sm text-blue-500">Here are the posts you have created</p>

                    {/* 🔍 Search Input */}
                    <div className="mt-6 max-w-sm mx-auto">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog) => (
                        <div
                            key={blog._id}
                            onClick={() => navigate(`/blogs/${blog._id}`)}
                            className="bg-white border border-blue-200 rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-transform backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-bold text-blue-700 mb-2">{blog.title}</h3>
                            <p className="text-blue-800 line-clamp-3">{blog.content}</p>
                            <div className="text-sm text-blue-500 mt-4">Views: {blog.views || 0}</div>
                        </div>
                    ))}
                </div>

                {/* ✨ Empty State for Search */}
                {filteredBlogs.length === 0 && (
                    <div className="text-center text-blue-600 mt-8 text-lg">
                        No blog posts match your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
