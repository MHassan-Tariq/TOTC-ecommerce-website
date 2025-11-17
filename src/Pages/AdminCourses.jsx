import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookPlus, Loader2, AlertCircle, Eye, Trash2, X } from "lucide-react";
import Navbar from "../Components/Navbar.jsx";
import FooterSection from "../Components/FooterSection.jsx";
import { tokenStorage } from "../utils/api.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const initialCourse = {
  title: "",
  description: "",
  duration: "",
  level: "Beginner",
  category: "General",
  price: "",
  whatYoullLearn: "",
  requirements: "",
  imageUrl: "",
  imagePublicId: "",
  videoUrl: "",
  videoPublicId: ""
};

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formState, setFormState] = useState(initialCourse);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoEta, setVideoEta] = useState('');
  const [videoError, setVideoError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [deletingId, setDeletingId] = useState("");
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [mediaNotice, setMediaNotice] = useState({ type: 'info', message: '' });

  const isEditing = Boolean(editingCourseId);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/courses`);
        setCourses(data.courses || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setImageError("");
    setVideoError("");
    setMediaNotice({ type: 'info', message: '' });
    setSaving(true);

    try {
      const token = tokenStorage.get();
      const headers = {
        Authorization: token ? `Bearer ${token}` : undefined
      };

      let data;
      if (isEditing) {
        const response = await axios.put(
          `${API_BASE_URL}/courses/${editingCourseId}`,
          formState,
          { headers }
        );
        data = response.data;
        setCourses((prev) =>
          prev.map((course) => (course._id === data.course._id ? data.course : course))
        );
        setSelectedCourse(data.course);
        setEditingCourseId(null);
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/courses`,
          formState,
          { headers }
        );
        data = response.data;
        setCourses((prev) => [data.course, ...prev]);
      }

      setFormState(initialCourse);
      setMediaNotice({ type: 'info', message: '' });
      setVideoProgress(0);
      setVideoEta('');
    } catch (err) {
      setError(
        err.response?.data?.message || (isEditing ? "Failed to update course" : "Failed to create course")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course._id);
    setFormState({
      title: course.title || "",
      description: course.description || "",
      duration: course.duration || "",
      level: course.level || "Beginner",
      category: course.category || "General",
      price: course.price !== undefined && course.price !== null ? course.price.toString() : "",
      whatYoullLearn: Array.isArray(course.whatYoullLearn) ? course.whatYoullLearn.join("\n") : "",
      requirements: Array.isArray(course.requirements) ? course.requirements.join("\n") : "",
      imageUrl: course.imageUrl || "",
      imagePublicId: course.imagePublicId || "",
      videoUrl: course.videoUrl || "",
      videoPublicId: course.videoPublicId || ""
    });
    setSelectedCourse(course);
  };

  const handleCancelEdit = () => {
    setEditingCourseId(null);
    setFormState(initialCourse);
    setImageError("");
    setVideoError("");
    setMediaNotice({ type: 'info', message: '' });
    setVideoProgress(0);
    setVideoEta('');
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    setDeletingId(courseId);
    setError("");

    try {
      const token = tokenStorage.get();
      await axios.delete(`${API_BASE_URL}/courses/${courseId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined
        }
      });

      setCourses((prev) => prev.filter((course) => course._id !== courseId));

      if (selectedCourse && selectedCourse._id === courseId) {
        setSelectedCourse(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete course");
    } finally {
      setDeletingId("");
    }
  };

  const handleImageUpload = async (event) => {
    const inputEl = event.target;
    const file = inputEl.files?.[0];
    if (!file) return;

    if (uploadingVideo) {
      setImageError('Please wait for the current video upload to finish.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setImageError('Please upload a valid image file.');
      return;
    }

    setUploadingImage(true);
    setImageError("");
    setVideoError("");
    setMediaNotice({ type: 'info', message: '' });
    try {
      const token = tokenStorage.get();
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await axios.post(`${API_BASE_URL}/courses/upload`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          'Content-Type': 'multipart/form-data'
        }
      });

      setFormState((prev) => ({
        ...prev,
        imageUrl: data.imageUrl,
        imagePublicId: data.imagePublicId,
        videoUrl: prev.videoUrl,
        videoPublicId: prev.videoPublicId
      }));
      setSelectedCourse((prev) =>
        prev
          ? {
              ...prev,
              imageUrl: data.imageUrl,
              imagePublicId: data.imagePublicId,
              videoUrl: prev.videoUrl,
              videoPublicId: prev.videoPublicId
            }
          : prev
      );
      setMediaNotice({ type: 'info', message: 'Cover image uploaded successfully.' });
      setVideoProgress(0);
      setVideoEta('');
    } catch (err) {
      setImageError(err.response?.data?.message || 'Failed to upload image');
      setMediaNotice({ type: 'error', message: err.response?.data?.message || 'Failed to upload image. Try again with a smaller file or different format.' });
    } finally {
      setUploadingImage(false);
      inputEl.value = '';
    }
  };

  const handleVideoUpload = async (event) => {
    const inputEl = event.target;
    const file = inputEl.files?.[0];
    if (!file) return;

    if (uploadingImage) {
      setVideoError('Please wait for the current image upload to finish.');
      return;
    }

    if (!file.type.startsWith('video/')) {
      setVideoError('Please upload a valid video file.');
      return;
    }

    setUploadingVideo(true);
    setVideoError("");
    setVideoProgress(0);
    setVideoEta('');
    setMediaNotice({ type: 'info', message: '' });
    setImageError('');
    const uploadStart = Date.now();

    try {
      const token = tokenStorage.get();
      const formData = new FormData();
      formData.append('video', file);

      const { data } = await axios.post(`${API_BASE_URL}/courses/upload/video`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;
          const loaded = progressEvent.loaded;
          const total = progressEvent.total;
          const percent = Math.round((loaded / total) * 100);
          setVideoProgress(percent);

          const elapsed = Date.now() - uploadStart;
          const speed = loaded / (elapsed / 1000); // bytes/sec
          if (speed > 0) {
            const remainingBytes = total - loaded;
            const secondsRemaining = remainingBytes / speed;
            if (Number.isFinite(secondsRemaining)) {
              const mins = Math.floor(secondsRemaining / 60);
              const secs = Math.max(0, Math.round(secondsRemaining % 60));
              setVideoEta(
                mins > 0
                  ? `${mins}m ${secs < 10 ? '0' : ''}${secs}s remaining`
                  : `${secs}s remaining`
              );
            }
          }
        }
      });

      setFormState((prev) => ({
        ...prev,
        videoUrl: data.videoUrl,
        videoPublicId: data.videoPublicId
      }));
      setSelectedCourse((prev) =>
        prev
          ? {
              ...prev,
              videoUrl: data.videoUrl,
              videoPublicId: data.videoPublicId
            }
          : prev
      );
      setVideoProgress(100);
      setVideoEta('');
      setMediaNotice({ type: 'info', message: 'Intro video uploaded successfully.' });
    } catch (err) {
      setVideoError(err.response?.data?.message || 'Failed to upload video');
      setMediaNotice({ type: 'error', message: err.response?.data?.message || 'Failed to upload video. Try again with a smaller file or supported format.' });
    } finally {
      setUploadingVideo(false);
      inputEl.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Course Management</h1>
            <p className="mt-2 text-sm text-gray-600">
              Add new learning paths and keep track of your catalog in real time.
            </p>
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/70 border border-gray-200 mb-10">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <BookPlus className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {isEditing ? "Edit course" : "Add a new course"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEditing
                  ? "Update the information and save your changes."
                  : "Provide essential details and publish instantly."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course title *</label>
                <input
                  type="text"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="e.g. Product Design Foundations"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formState.duration}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="e.g. 8 weeks"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="Describe the course, expected outcomes, and prerequisites."
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  name="level"
                  value={formState.level}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formState.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="General">General</option>
                  <option value="Creative">Creative</option>
                  <option value="Developer">Developer</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="price"
                  value={formState.price}
                  onChange={handleChange}
                  placeholder="e.g. 199"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course cover image</label>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <label className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-full border border-dashed border-emerald-300 bg-emerald-50/60 text-sm font-medium text-emerald-600 cursor-pointer hover:bg-emerald-100 transition">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    {uploadingImage ? 'Uploading…' : 'Upload image'}
                  </label>
                  {formState.imageUrl && (
                    <div className="relative h-20 w-32 overflow-hidden rounded-xl border border-gray-200">
                      <img
                        src={formState.imageUrl}
                        alt="Course cover"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {imageError && (
                  <p className="mt-2 text-xs text-red-500">{imageError}</p>
                )}
                <div className="mt-4 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Intro video (optional)</label>
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                    <label className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-full border border-dashed border-blue-300 bg-blue-50/60 text-sm font-medium text-blue-600 cursor-pointer hover:bg-blue-100 transition">
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoUpload}
                      />
                      {uploadingVideo ? 'Uploading…' : 'Upload video'}
                    </label>
                    {uploadingVideo && (videoProgress > 0 || videoEta) && (
                      <div className="flex flex-col gap-1 text-xs text-blue-600">
                        <div className="h-1.5 w-full rounded-full bg-blue-100">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-all"
                            style={{ width: `${videoProgress}%` }}
                          />
                        </div>
                        {videoEta && <span>{videoEta}</span>}
                      </div>
                    )}
                    {formState.videoUrl && (
                      <video
                        src={formState.videoUrl}
                        className="h-24 w-full sm:w-64 rounded-xl border border-gray-200"
                        controls
                      />
                    )}
                  </div>
                  {videoError && (
                    <p className="mt-2 text-xs text-red-500">{videoError}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">What you'll learn</label>
                <textarea
                  name="whatYoullLearn"
                  value={formState.whatYoullLearn}
                  onChange={handleChange}
                  rows={4}
                  placeholder="List key learning outcomes (one per line)"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                <textarea
                  name="requirements"
                  value={formState.requirements}
                  onChange={handleChange}
                  rows={3}
                  placeholder="List prerequisites (one per line)"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
            {mediaNotice.message && (
              <div
                className={`sm:col-span-2 text-xs ${
                  mediaNotice.type === 'error' ? 'text-red-600' : 'text-blue-600'
                }`}
              >
                {mediaNotice.message}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/40 hover:bg-emerald-600 transition disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving
                  </>
                ) : (
                  isEditing ? "Save changes" : "Publish course"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/70 border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Course catalog</h2>
              <span className="text-xs font-medium text-gray-500">{courses.length} total</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
              </div>
            ) : courses.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-gray-500">
                No courses yet. Start by adding your first program above.
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {courses.map((course) => (
                  <li key={course._id} className="px-6 py-5">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">{course.title}</h3>
                          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{course.description}</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 font-medium">
                            {course.level || "Beginner"}
                          </span>
                          {course.category && (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-blue-700 font-medium">
                              {course.category}
                            </span>
                          )}
                          <span>{course.duration}</span>
                          {course.price !== undefined && course.price !== null && (
                            <span className="font-semibold text-emerald-600">
                              ${Number(course.price).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-100 flex items-center justify-center">
                        {course.imageUrl ? (
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="h-36 w-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">No image</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => handleViewCourse(course)}
                          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                        >
                          <Eye className="h-4 w-4" /> View details
                        </button>
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-100 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          disabled={deletingId === course._id}
                          className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100 transition disabled:opacity-60"
                        >
                          {deletingId === course._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/70 border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Course details</h3>
              {selectedCourse && (
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" /> Close
                </button>
              )}
            </div>

            {selectedCourse ? (
              <div className="space-y-3 text-sm text-gray-600">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100 flex items-center justify-center">
                  {selectedCourse.imageUrl ? (
                    <img
                      src={selectedCourse.imageUrl}
                      alt={selectedCourse.title}
                      className="w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">Title</p>
                  <p className="text-base font-semibold text-gray-900">{selectedCourse.title}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">Description</p>
                  <p className="leading-relaxed">{selectedCourse.description}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">Category</p>
                    <p className="font-medium text-gray-900">{selectedCourse.category || 'General'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">Price</p>
                    <p className="font-medium text-gray-900">${Number(selectedCourse.price || 0).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">Duration</p>
                    <p className="font-medium text-gray-900">{selectedCourse.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">Level</p>
                    <p className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 font-medium">
                      {selectedCourse.level || 'Beginner'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">Created</p>
                  <p>{new Date(selectedCourse.createdAt).toLocaleString()}</p>
                </div>
                {Array.isArray(selectedCourse.whatYoullLearn) && selectedCourse.whatYoullLearn.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">What you'll learn</p>
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                      {selectedCourse.whatYoullLearn.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(selectedCourse.requirements) && selectedCourse.requirements.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">Requirements</p>
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                      {selectedCourse.requirements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="pt-2">
                  <button
                    onClick={() => handleEditCourse(selectedCourse)}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-100 transition"
                  >
                    Edit course
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Select a course to preview full details or manage its enrollment settings.
              </p>
            )}
          </div>
        </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default AdminCourses;
