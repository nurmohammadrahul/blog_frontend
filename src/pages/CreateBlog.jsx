import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    ArrowLeftCircle,
    XCircle,
    Loader2,
} from "lucide-react";

const CreateBlog = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.user?.token);

    const [formData, setFormData] = useState({ title: "", content: "" });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const contentRef = useRef(null);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const formatText = (command) => {
        document.execCommand(command, false, null);
        setFormData((prev) => ({
            ...prev,
            content: contentRef.current.innerHTML,
        }));
    };

    const handleContentInput = () => {
        setFormData((prev) => ({
            ...prev,
            content: contentRef.current.innerHTML,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        if (!token) {
            alert("You must be logged in to create a blog.");
            setSubmitting(false);
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/blogs`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate("/blogs", { state: { message: "Blog created successfully!" } });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create blog.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl border border-blue-100 rounded-2xl p-6 sm:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                                Create Blog Post
                            </h2>
                            <p className="mt-2 text-sm text-blue-500">
                                Share your thoughts and ideas
                            </p>
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="text-blue-500 hover:text-blue-700 transition"
                            title="Go Back"
                        >
                            <ArrowLeftCircle size={32} />
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-700 border border-red-300 flex items-center gap-2">
                            <XCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-semibold text-blue-700 mb-1"
                            >
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
                            <label
                                className="block text-sm font-semibold text-blue-700 mb-1"
                            >
                                Content
                            </label>

                            <div className="flex gap-2 mb-2">
                                <button
                                    type="button"
                                    onClick={() => formatText("bold")}
                                    title="Bold"
                                    className="p-2 border border-blue-300 rounded hover:bg-blue-100 transition"
                                >
                                    <Bold size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => formatText("italic")}
                                    title="Italic"
                                    className="p-2 border border-blue-300 rounded hover:bg-blue-100 transition"
                                >
                                    <Italic size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => formatText("underline")}
                                    title="Underline"
                                    className="p-2 border border-blue-300 rounded hover:bg-blue-100 transition"
                                >
                                    <Underline size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => formatText("insertUnorderedList")}
                                    title="Bullet List"
                                    className="p-2 border border-blue-300 rounded hover:bg-blue-100 transition"
                                >
                                    <List size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => formatText("insertOrderedList")}
                                    title="Numbered List"
                                    className="p-2 border border-blue-300 rounded hover:bg-blue-100 transition"
                                >
                                    <ListOrdered size={18} />
                                </button>
                            </div>

                            <div
                                ref={contentRef}
                                contentEditable
                                onInput={handleContentInput}
                                className="w-full min-h-[200px] px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 bg-blue-50 text-gray-800 placeholder:text-blue-300"
                                dangerouslySetInnerHTML={{ __html: formData.content }}
                            />
                        </div>

                        <div className="flex items-center justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                disabled={submitting}
                                className="flex items-center gap-1 px-5 py-2 rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 transition disabled:opacity-50"
                            >
                                <ArrowLeftCircle size={18} />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {submitting ? (
                                    <span className="flex items-center">
                                        <Loader2 size={18} className="animate-spin mr-2" />
                                        Creating...
                                    </span>
                                ) : (
                                    "Create Blog"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
