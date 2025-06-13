import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.user?.token);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blogs/${id}`
        );
        setFormData({ title: data.title, content: data.content });
      } catch {
        setError("Failed to load blog. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

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
      alert("You must be logged in to edit a blog.");
      setSubmitting(false);
      return;
    }

    // Check if content is empty or only whitespace
    if (!contentRef.current.innerText.trim()) {
      setError("Blog content cannot be empty.");
      setSubmitting(false);
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/blogs/${id}`, {
        state: { message: "Blog updated successfully!" },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update blog.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-blue-100 p-6 sm:p-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700">
              Edit Blog
            </h2>
            <p className="text-blue-400 mt-1">Refresh your ideas with updates</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:text-blue-700 transition"
            title="Go Back"
            aria-label="Go Back"
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
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Blog Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter blog title"
              className="w-full px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-800 focus:ring-2 focus:ring-blue-500 transition"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Blog Content
            </label>

            {/* Toolbar */}
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => formatText("bold")}
                title="Bold"
                aria-label="Bold"
                className="p-2 border rounded hover:bg-blue-100"
              >
                <Bold size={18} />
              </button>
              <button
                type="button"
                onClick={() => formatText("italic")}
                title="Italic"
                aria-label="Italic"
                className="p-2 border rounded hover:bg-blue-100"
              >
                <Italic size={18} />
              </button>
              <button
                type="button"
                onClick={() => formatText("underline")}
                title="Underline"
                aria-label="Underline"
                className="p-2 border rounded hover:bg-blue-100"
              >
                <Underline size={18} />
              </button>
              <button
                type="button"
                onClick={() => formatText("insertUnorderedList")}
                title="Bullet List"
                aria-label="Bullet List"
                className="p-2 border rounded hover:bg-blue-100"
              >
                <List size={18} />
              </button>
              <button
                type="button"
                onClick={() => formatText("insertOrderedList")}
                title="Numbered List"
                aria-label="Numbered List"
                className="p-2 border rounded hover:bg-blue-100"
              >
                <ListOrdered size={18} />
              </button>
            </div>

            {/* Rich Text Editor */}
            <div
              ref={contentRef}
              contentEditable
              onInput={handleContentInput}
              className="w-full min-h-[200px] px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            ></div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={submitting}
              className="flex items-center gap-1 px-5 py-2 rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 transition disabled:opacity-50"
            >
              <ArrowLeftCircle size={18} />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditBlog;
