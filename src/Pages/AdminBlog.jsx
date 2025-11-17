import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../Components/Navbar.jsx";
import FooterSection from "../Components/FooterSection.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Loader2, PenSquare, Tag, Calendar, Trash2, Edit3, Image as ImageIcon, Folder } from "lucide-react";
import { Link } from "react-router-dom";
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
} from "../utils/api.js";
import { tokenStorage } from "../utils/api.js";
import { useLocation } from "react-router-dom";

const CATEGORY_OPTIONS = ["General", "Creative", "Developer", "Marketing", "Sales"];

const initialFormState = {
  title: "",
  excerpt: "",
  content: "",
  category: "General",
  categoryImage: "",
  tags: "",
  publishedAt: "",
};

const AdminBlog = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [categoryImageUploading, setCategoryImageUploading] = useState(false);
  const [categoryImageError, setCategoryImageError] = useState("");

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogs();
      setBlogs(data.blogs || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    const state = location.state;
    if (state?.editId && blogs.length) {
      const blogToEdit = blogs.find((blog) => blog._id === state.editId);
      if (blogToEdit) {
        setEditingId(blogToEdit._id);
        setFormData({
          title: blogToEdit.title || "",
          excerpt: blogToEdit.excerpt || "",
          content: blogToEdit.content || "",
          category: blogToEdit.category || "General",
          categoryImage: blogToEdit.categoryImage || "",
          tags: (blogToEdit.tags || []).join(", "),
          publishedAt: blogToEdit.publishedAt ? new Date(blogToEdit.publishedAt).toISOString().slice(0, 16) : "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [location.state, blogs]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setCategoryImageError("");
    setCategoryImageUploading(false);
  };

  const handleCategoryImageUpload = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const token = tokenStorage.get();
    if (!token) {
      setCategoryImageError("You must be logged in as an admin to upload images.");
      return;
    }

    setCategoryImageError("");
    setCategoryImageUploading(true);

    try {
      const { imageUrl } = await uploadBlogImage(file, token);
      setFormData((prev) => ({ ...prev, categoryImage: imageUrl }));
    } catch (err) {
      setCategoryImageError(err.message || "Failed to upload image");
    } finally {
      setCategoryImageUploading(false);
      event.target.value = "";
    }
  };

  const handleCategoryImageRemove = () => {
    setFormData((prev) => ({ ...prev, categoryImage: "" }));
    setCategoryImageError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = tokenStorage.get();
    if (!token) {
      setError("You must be logged in as an admin to manage blogs.");
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const contentText = formData.content.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    if (!contentText) {
      setError("Please add some content to your post.");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim(),
      content: formData.content,
      category: formData.category.trim(),
      categoryImage: formData.categoryImage,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      publishedAt: formData.publishedAt || undefined,
    };

    try {
      setIsSubmitting(true);
      if (editingId) {
        await updateBlog(editingId, payload, token);
        setSuccessMessage("Blog updated successfully.");
      } else {
        await createBlog(payload, token);
        setSuccessMessage("Blog created successfully.");
      }
      resetForm();
      await loadBlogs();
    } catch (err) {
      setError(err.message || "Failed to save blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "General",
      categoryImage: blog.categoryImage || "",
      tags: (blog.tags || []).join(", "),
      publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString().slice(0, 16) : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const token = tokenStorage.get();
    if (!token) {
      setError("You must be logged in as an admin to manage blogs.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");
    if (!confirmDelete) return;

    try {
      await deleteBlog(id, token);
      setSuccessMessage("Blog deleted successfully.");
      await loadBlogs();
    } catch (err) {
      setError(err.message || "Failed to delete blog");
    }
  };

  useEffect(() => {
    if (!successMessage) return;
    const timeout = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [successMessage]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-10 lg:py-14">
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">Admin Blog Studio</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">Manage blog content</h1>
            <p className="mt-3 text-gray-600 max-w-2xl text-sm sm:text-base">
              Create stories, announcements, and learning insights for your community. Posts appear instantly on the public blog page.
            </p>
          </div>
          {user && (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm text-sm">
              <p className="font-semibold text-gray-800">Logged in as</p>
              <p className="mt-1 text-gray-600">{user.name}</p>
              <p className="text-xs text-emerald-600 mt-2 uppercase tracking-[0.3em]">Admin</p>
            </div>
          )}
        </header>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg shadow-gray-200/70 mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{editingId ? "Edit blog post" : "Create new blog post"}</h2>
              <p className="text-sm text-gray-500">Provide a compelling story, update, or resource for your learners.</p>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Cancel editing
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                placeholder="Compose a standout headline"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                placeholder="A short summary (optional)"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Content</label>
              <div className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
                  placeholder="Write the main body of your post"
                  className="blog-quill-editor"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'blockquote', 'code-block'],
                      [{ align: [] }],
                      ['clean']
                    ],
                  }}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 bg-white"
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="leadership, onboarding, ux"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Publish date</label>
                <input
                  type="datetime-local"
                  name="publishedAt"
                  value={formData.publishedAt}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <ImageIcon className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Category spotlight image</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Upload an image that represents this category. Ideal dimensions 800×450px.
                    </p>
                  </div>
                  <div className="h-40 w-full overflow-hidden rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                    {formData.categoryImage ? (
                      <img
                        src={formData.categoryImage}
                        alt="Category"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/img/book1.jpg";
                        }}
                      />
                    ) : (
                      <div className="text-xs text-gray-400">No category image selected</div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                      Upload image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCategoryImageUpload}
                        disabled={categoryImageUploading}
                      />
                    </label>
                    {formData.categoryImage && (
                      <button
                        type="button"
                        onClick={handleCategoryImageRemove}
                        className="inline-flex items-center rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                        disabled={categoryImageUploading}
                      >
                        Remove
                      </button>
                    )}
                    {categoryImageUploading && (
                      <span className="inline-flex items-center gap-2 text-xs text-emerald-600">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...
                      </span>
                    )}
                  </div>
                  {categoryImageError && (
                    <p className="text-xs text-red-500">{categoryImageError}</p>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
                {successMessage}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-600 disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <PenSquare className="h-4 w-4" />
                    {editingId ? "Update post" : "Publish post"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Reset
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg shadow-gray-200/70">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Published posts</h2>
              <p className="text-sm text-gray-500">Manage the stories currently visible on your blog.</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-12 text-center text-sm text-gray-500">
              No blog posts yet. Publish your first story above.
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <article key={blog._id} className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 shadow-sm hover:shadow-md transition">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex w-full flex-col gap-4 md:flex-row md:items-start">
                      {blog.categoryImage && (
                        <div className="h-24 w-full md:h-24 md:w-32 overflow-hidden rounded-xl bg-white shadow-sm">
                          <img
                            src={blog.categoryImage}
                            alt="Category"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/img/book1.jpg";
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        {blog.category && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            <Folder className="h-3 w-3" />
                            {blog.category}
                          </span>
                        )}
                        <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">{blog.title}</h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "Draft"}
                          </span>
                          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {blog.tags.join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        to={`/blog/${blog._id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default AdminBlog;
