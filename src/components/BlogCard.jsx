import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => (
    <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-blue-200 transform hover:-translate-y-1 flex flex-col">
        <div className="p-5 sm:p-6 flex flex-col flex-grow">
            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mb-3 leading-tight line-clamp-2">
                {blog.title}
            </h2>

            {/* Author Info */}
            <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full border border-blue-300 shadow-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm font-semibold text-indigo-700">
                        {blog.author?.username || "Unknown Author"}
                    </p>
                    <p className="text-xs text-blue-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Blog Snippet */}
            <p className="text-gray-700 mb-4 text-sm sm:text-base line-clamp-3 flex-grow leading-relaxed">
                {blog.content}
            </p>

            {/* Read More */}
            <div className="mt-auto pt-3">
                <Link
                    to={`/blogs/${blog._id}`}
                    className="inline-flex items-center px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Read more
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    </div>
);

export default BlogCard;
