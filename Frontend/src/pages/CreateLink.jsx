import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/CreateLink.css';
import axios from '../config/axiosConfig';
import { toast } from 'react-toastify';

const CreateLink = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    projectImage: null,
    githubUrl: '',
    linkedinUrl: '',
    liveUrl: '',
    linkLabel: '',
    linkUrl: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const form = new FormData();
      form.append('title', formData.projectTitle);
      form.append('githubUrl', formData.githubUrl);
      form.append('linkedinUrl', formData.linkedinUrl);
      form.append('liveUrl', formData.liveUrl);
      form.append('projectDescription', formData.projectDescription);
      form.append('projectImage', formData.projectImage);

      await axios.post(`/${title}/create`, form);
      toast.success('Project Created Successfully');
      navigate('/admin/customize');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const payload = {
        title: formData.linkLabel,
        url: formData.linkUrl,
      };

      await axios.post(`/${title}/create`, payload);
      toast.success(`${title} link created successfully!`);
      navigate('/admin/customize');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-link-container">
      {loading && (
        <div className="overlay-loader">
          <div className="spinner"></div>
          <p className="loader-text">Creating {title}...</p>
        </div>
      )}

      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">Create {title}</h1>
          <div className="form-icon">
            {title === 'Project' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v2h10V7H7zm0 4v2h10v-2H7zm0 4v2h7v-2H7z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z"/>
              </svg>
            )}
          </div>
        </div>

        {title === 'Project' ? (
          <form onSubmit={handleProjectSubmit} encType="multipart/form-data" className="project-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="projectTitle">Project Title</label>
                <input
                  type="text"
                  id="projectTitle"
                  name="projectTitle"
                  className='text-black'
                  value={formData.projectTitle}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Enter project name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="githubUrl">GitHub URL</label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  className='text-black'
                  value={formData.githubUrl}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="https://github.com/your-project"
                />
              </div>

              <div className="form-group span-2">
                <label htmlFor="projectDescription">Project Description</label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  className='text-black'
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Describe your project in detail..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectImage">Project Image</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="projectImage"
                    name="projectImage"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <label htmlFor="projectImage" className="file-upload-label">
                    {formData.projectImage ? formData.projectImage.name : 'Choose an image...'}
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="linkedinUrl">LinkedIn URL</label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  className='text-black'
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="https://linkedin.com/share/your-project"
                />
              </div>

              <div className="form-group">
                <label htmlFor="liveUrl">Live View URL</label>
                <input
                  type="url"
                  id="liveUrl"
                  name="liveUrl"
                  className='text-black'
                  value={formData.liveUrl}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="https://your-project-demo.com"
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-btn"></span>
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLinkSubmit} className="link-form">
            <div className="form-group">
              <label htmlFor="linkLabel">Link Label</label>
              <input
                type="text"
                id="linkLabel"
                name="linkLabel"
                className='text-black'
                value={formData.linkLabel}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="e.g., My Portfolio"
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkUrl">Link URL</label>
              <input
                type="url"
                id="linkUrl"
                name="linkUrl"
                className='text-black'
                value={formData.linkUrl}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="https://example.com"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-btn"></span>
                  Creating...
                </>
              ) : (
                'Create Link'
              )}
            </button>
          </form>
        )}

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default CreateLink;