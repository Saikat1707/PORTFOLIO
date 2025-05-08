import React, { useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onProjectformSubmit = async (e) => {
    e.preventDefault();

    const projectData = new FormData();
    projectData.append('title', formData.projectTitle);
    projectData.append('url', formData.projectLink);
    projectData.append('projectDescription', formData.projectDescription);
    projectData.append('projectImage', formData.projectImage);

    try {
      await axios.post(`/${title}/create`, projectData);
      setSuccessMessage('Project created successfully!');
      setError('');
      navigate('/admin/customize');
    } catch (err) {
      setError(`${err.response.data.message}. Please try again. `);
      setSuccessMessage('');
    }
  };

  const onLinkFormSubmit = async (e) => {
    e.preventDefault();

    const linkData = {
      title: formData.linkLabel,
      url: formData.linkUrl,
    };

    try {
      await axios.post(`/${title}/create`, linkData);
      setSuccessMessage(`${title} link created successfully!`);
      setError('');
      navigate('/admin/customize')
    } catch (err) {
      console.log(err.response.data.message)
      setError(`${err.response.data.message}. Please try again. `);
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-wrapper">
      <h1 className="text-xl font-bold mb-3">Create a {title} Link</h1>

      {title === 'Project' ? (
        // Project form
        <form method="POST" encType="multipart/form-data" onSubmit={onProjectformSubmit}>
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
        // Programming/Social form
        <form onSubmit={onLinkFormSubmit}>
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

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default CreateLink;
