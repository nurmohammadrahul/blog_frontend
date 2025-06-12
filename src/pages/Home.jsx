import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogs/blogSlice";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);
    const { user } = useSelector((state) => state.auth);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100 p-6">
            <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden animate-pulse backdrop-blur-sm"
                    >
                        <div className="h-48 bg-blue-100 rounded-t-2xl"></div>
                        <div className="p-4">
                            <div className="h-6 bg-blue-100 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-blue-100 rounded w-full mb-2"></div>
                            <div className="h-4 bg-blue-100 rounded w-5/6 mb-4"></div>
                            <div className="flex justify-between">
                                <div className="h-4 bg-blue-100 rounded w-1/4"></div>
                                <div className="h-4 bg-blue-100 rounded w-1/4"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (isError) return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-blue-50 via-white to-blue-100">
            <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl border border-blue-100 backdrop-blur-sm text-center">
                <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-3">
                    Error loading blogs
                </h3>
                <p className="text-gray-700 mb-6">{message || "Failed to fetch blog posts"}</p>
                <button
                    onClick={() => dispatch(getBlogs())}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    if (blogs.length === 0) return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-blue-50 via-white to-blue-100">
            <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl border border-blue-100 backdrop-blur-sm text-center">
                <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-3">
                    No blog posts yet
                </h3>
                <p className="text-gray-700 mb-6">Be the first to create an amazing blog post!</p>
                {user ? (
                    <Link
                        to="/create"
                        className="inline-block px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition duration-200"
                    >
                        Create Blog
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="inline-block px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition duration-200"
                    >
                        Login to Create
                    </Link>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 drop-shadow-lg">
                        Latest Blog Posts
                    </h1>
                    {user && (
                        <div className="mt-4">
                            <Link
                                to="/create"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg transition duration-200"
                            >
                                + New Post
                            </Link>
                        </div>
                    )}
                </div>

                {/* Search Input */}
                <div className="mb-8 max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search blogs by title..."
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredBlogs.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg">No blogs match your search.</div>
                ) : (
                    <div className="grid grid-cols-1 mb-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} colorful />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
