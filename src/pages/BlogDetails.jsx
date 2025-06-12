import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.user?.token);

    const [blog, setBlog] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingBlog, setLoadingBlog] = useState(true);
    const [loadingUser, setLoadingUser] = useState(!!token);

    const getId = (val) =>
        typeof val === "string" ? val : val?._id?.toString();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`)
            .then((res) => setBlog(res.data))
            .catch(console.error)
            .finally(() => setLoadingBlog(false));
    }, [id]);

    useEffect(() => {
        if (!token) {
            setLoadingUser(false);
            return;
        }
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setCurrentUser(res.data))
            .catch(console.error)
            .finally(() => setLoadingUser(false));
    }, [token]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/");
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete blog.");
        }
    };

    if (loadingBlog || loadingUser) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-100 via-white to-purple-200">
                <div className="rounded-full h-16 w-16 border-4 border-purple-700 animate-pulse" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-tr from-purple-100 via-white to-purple-200">
                <div className="text-center bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full border border-purple-300">
                    <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white p-4 rounded-t-xl -mt-6 mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold">Blog Not Found</h2>
                    </div>
                    <p className="text-gray-700 mb-6 text-sm sm:text-base">
                        The blog you're looking for doesn't exist or may have been removed.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-lg transition-shadow shadow-lg text-sm sm:text-base"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const blogAuthorId = getId(blog.author);
    const userId = getId(currentUser?._id);
    const isAuthor = userId && blogAuthorId === userId;

    return (
        <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-white to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-purple-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-700 to-purple-500 p-6 sm:p-8 text-white">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-start">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 break-words">
                                {blog.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                                <span className="bg-white text-purple-700 bg-opacity-30 backdrop-blur-sm px-3 py-1 rounded-full">
                                    👤{" "}
                                    {typeof blog.author === "object"
                                        ? blog.author.username
                                        : blog.author}
                                </span>
                                <span className="bg-white text-purple-700 bg-opacity-30 backdrop-blur-sm px-3 py-1 rounded-full">
                                    📅{" "}
                                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                                <span className="bg-white text-purple-700 bg-opacity-30 backdrop-blur-sm px-3 py-1 rounded-full">
                                    👁️ Views: {blog.views || 0}
                                </span>
                            </div>
                        </div>

                        {isAuthor && (
                            <div className="flex gap-3">
                                <Link
                                    to={`/edit/${blog._id}`}
                                    className="self-start sm:self-center px-5 py-2 bg-white text-purple-700 rounded-lg shadow hover:bg-purple-100 transition text-sm sm:text-base font-semibold"
                                >
                                    ✏️ Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="self-start sm:self-center px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:from-red-600 hover:to-red-700 transition text-sm sm:text-base font-semibold"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 sm:p-8 text-purple-900">
                    <div className="prose prose-purple max-w-none">
                        {blog.content.split("\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-tr from-purple-50 via-white to-purple-100 px-6 py-4 border-t border-purple-300 flex justify-between items-center rounded-b-2xl">
                    <Link
                        to="/"
                        className="inline-flex items-center px-5 py-2 bg-white text-purple-700 hover:bg-purple-700 hover:text-white rounded-lg shadow transition text-sm sm:text-base font-semibold"
                    >
                        ← Back to Blogs
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
