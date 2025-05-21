import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/CreateLink.css';
import axios from '../config/axiosConfig';

const CreateLink = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectTitle: '',
    projectLink: '',
    projectDescription: '',
    projectImage: null,
    linkLabel: '',
    linkUrl: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log('Changing:', name, value); 
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Submit handler for project form
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const form = new FormData();
      form.append('title', formData.projectTitle);
      form.append('url', formData.projectLink);
      form.append('projectDescription', formData.projectDescription);
      form.append('projectImage', formData.projectImage);

      for (let [key, value] of form.entries()) {
        console.log(`${key}:`, value);
      }

      await axios.post(`/${title}/create`, form);
      setSuccessMessage('Project created successfully!');
      navigate('/admin/customize');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  // Submit handler for social/programming link
  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const payload = {
        title: formData.linkLabel,
        url: formData.linkUrl,
      };

      await axios.post(`/${title}/create`, payload);
      setSuccessMessage(`${title} link created successfully!`);
      navigate('/admin/customize');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="form-wrapper">
      <h1 className="text-xl font-bold mb-4">Create a {title} Link</h1>

      {title === 'Project' ? (
        // 🛠️ Project Creation Form
        <form onSubmit={handleProjectSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="projectTitle">Project Title</label>
            <input
              type="text"
              id="projectTitle"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectLink">Project Link</label>
            <input
              type="url"
              id="projectLink"
              name="projectLink"
              value={formData.projectLink}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectDescription">Project Description</label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectImage">Project Image</label>
            <input
              type="file"
              id="projectImage"
              name="projectImage"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Create Project</button>
        </form>
      ) : (
        // 🔗 Link Creation Form (Social / Programming)
        <form onSubmit={handleLinkSubmit}>
          <div className="form-group">
            <label htmlFor="linkLabel">Link Label</label>
            <input
              type="text"
              id="linkLabel"
              name="linkLabel"
              value={formData.linkLabel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkUrl">Link URL</label>
            <input
              type="url"
              id="linkUrl"
              name="linkUrl"
              value={formData.linkUrl}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Create Link</button>
        </form>
      )}

      {/* Feedback Messages */}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default CreateLink;
