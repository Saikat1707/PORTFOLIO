import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import '../css/UpdateLink.css';
import { toast } from 'react-toastify';

const UpdateProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    githubUrl: '',
    linkedinUrl: '',
    liveUrl: '',
    projectDescription: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/Project/display/${projectId}`);
        console.log(res.data.data)
        const { title, githubUrl, linkedinUrl, liveUrl, projectDescription, projectImageRefId } = res.data.data;
        setFormData({
          title,
          githubUrl: githubUrl || '',
          linkedinUrl: linkedinUrl || '',
          liveUrl: liveUrl || '',
          projectDescription,
        });

        setImagePreview(projectImageRefId?.secureUrl || '');
      } catch (err) {
        toast.error('Failed to fetch project');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('githubUrl', formData.githubUrl);
    data.append('linkedinUrl', formData.linkedinUrl);
    data.append('liveUrl', formData.liveUrl);
    data.append('projectDescription', formData.projectDescription);
    if (image) data.append('projectImage', image);

    try {
      await axios.put(`/Project/update/${projectId}`, data);
      toast.success('Project Updated Successfully');
      navigate('/admin/customize');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update project. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="update-container">
        <div className="overlay-loader">
          <div className="spinner"></div>
          <p className="loader-text">Loading project data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="update-container">
      {isUpdating && (
        <div className="overlay-loader">
          <div className="spinner"></div>
          <p className="loader-text">Updating Project...</p>
        </div>
      )}

      <div className="update-card">
        <div className="update-header">
          <h2 className="update-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="update-icon">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
            Update Project
          </h2>
          <p className="update-subtitle">Edit your project details below</p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="update-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Project Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="text-black"
                value={formData.title}
                onChange={handleChange}
                placeholder="My Awesome Project"
                required
                disabled={isUpdating}
              />
            </div>

            <div className="form-group">
              <label htmlFor="githubUrl">GitHub URL</label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                className="text-black"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/your-project"
                disabled={isUpdating}
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedinUrl">LinkedIn URL</label>
              <input
                type="url"
                id="linkedinUrl"
                name="linkedinUrl"
                className="text-black"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/share/your-project"
                disabled={isUpdating}
              />
            </div>

            <div className="form-group">
              <label htmlFor="liveUrl">Live View URL</label>
              <input
                type="url"
                id="liveUrl"
                name="liveUrl"
                className="text-black"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://your-project-demo.com"
                disabled={isUpdating}
              />
            </div>

            <div className="form-group span-2">
              <label htmlFor="projectDescription">Project Description</label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className="text-black"
                placeholder="Describe your project in detail..."
                required
                disabled={isUpdating}
                rows="5"
              />
            </div>

            {imagePreview && (
              <div className="form-group span-2">
                <label>Current Project Image</label>
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Project Preview" className="preview-img" />
                </div>
              </div>
            )}

            <div className="form-group span-2">
              <label htmlFor="projectImage">Upload New Image</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="projectImage"
                  name="projectImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUpdating}
                />
                <label htmlFor="projectImage" className="file-upload-label">
                  {image ? image.name : 'Choose a new project image...'}
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isUpdating}>
            {isUpdating ? (
              <>
                <span className="spinner-btn"></span>
                Updating...
              </>
            ) : (
              'Update Project'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;