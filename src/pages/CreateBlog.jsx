import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../features/blogs/blogSlice";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const [formData, setFormData] = useState({ title: "", content: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.token) {
            alert("You must be logged in to create a blog.");
            return;
        }
        try {
            await dispatch(createBlog(formData)).unwrap();
            navigate("/");
        } catch (err) {
            alert("Failed to create blog: " + err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl border border-blue-100 rounded-2xl p-6 sm:p-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                            Create a New Blog Post
                        </h2>
                        <p className="mt-2 text-sm text-blue-500">
                            Share your thoughts and ideas with the community
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
                            />
                        </div>

                        <div className="flex items-center justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="px-6 py-2.5 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-200 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Publish Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
