import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.user?.token);
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
                setFormData({
                    title: data.title,
                    content: data.content,
                });
            } catch (err) {
                setError("Failed to load blog. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        if (!token) {
            alert("You must be logged in to edit a blog.");
            setSubmitting(false);
            return;
        }
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/blogs/${id}`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate(`/blogs/${id}`, { state: { message: "Blog updated successfully!" } });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update blog.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error && !loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
                <div className="text-center max-w-md p-6 bg-white rounded-2xl shadow-xl border border-red-300">
                    <h3 className="text-xl font-bold text-red-600 mb-2">Error</h3>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-200 font-medium"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl border border-blue-100 rounded-2xl p-6 sm:p-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                            Edit Blog Post
                        </h2>
                        <p className="mt-2 text-sm text-blue-500">
                            Update your thoughts and ideas
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-blue-700 mb-1">
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Enter a compelling title"
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 bg-blue-50 text-gray-800 placeholder:text-blue-300"
                                onChange={handleChange}
                                value={formData.title}
                                required
                                disabled={submitting}
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-semibold text-blue-700 mb-1">
                                Content
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                rows={8}
                                placeholder="Write your blog content here..."
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 bg-blue-50 text-gray-800 placeholder:text-blue-300"
                                onChange={handleChange}
                                value={formData.content}
                                required
                                disabled={submitting}
                            />
                        </div>

                        <div className="flex items-center justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                disabled={submitting}
                                className="px-6 py-2.5 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-200 font-medium disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {submitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Updating...
                                    </span>
                                ) : "Update Blog"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
