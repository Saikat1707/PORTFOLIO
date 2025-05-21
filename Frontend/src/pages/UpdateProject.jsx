import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import '../css/UpdateLink.css';

const UpdateProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    projectDescription: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/Project/display/${projectId}`);
        const { title, url, projectDescription, projectImageRefId } = res.data.data;

        setFormData({ title, url, projectDescription });
        setImagePreview(projectImageRefId?.secureUrl || '');
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch project data.');
        setLoading(false);
        console.error(err);
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

    const data = new FormData();
    data.append('title', formData.title);
    data.append('url', formData.url);
    data.append('projectDescription', formData.projectDescription);
    if (image) data.append('projectImage', image);

    try {
      await axios.put(`/Project/update/${projectId}`, data);
      alert('Project updated successfully!');
      navigate('/admin/customize');
    } catch (err) {
      console.error(err);
      alert('Failed to update project. Please try again.');
    }
  };

  if (loading) return <p>Loading project...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="update-form-container">
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Project Link</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
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

        {imagePreview && (
          <div className="form-group">
            <label>Current Image</label>
            <img src={imagePreview} alt="Project Preview" className="preview-img" />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="projectImage">Upload New Image</label>
          <input
            type="file"
            id="projectImage"
            name="projectImage"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="update-btn">Update Project</button>
      </form>
    </div>
  );
};

export default UpdateProject;
