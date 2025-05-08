import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import '../css/UpdateLink.css'; // Or use a new CSS file

const UpdateProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
    const [imagePath, setImagePath] = useState("")
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    projectDescription: '',
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`/Project/display/${projectId}`)
      .then(res => {
        console.log(res.data.data);
        setImagePath(res.data.data.projectImageRefId.secureUrl);
        console.log(imagePath);
        const { title, url , projectDescription } = res.data.data;
        setFormData({ title, url , projectDescription});
      })
      .catch(err => console.error(err));
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('url', formData.link);
    data.append('projectDescription', formData.description);
    
    if (image) data.append('image', image);

    axios.put(`/Project/update/${projectId}`, data)
      .then(res => {
        alert('Project updated successfully!');
        navigate('/admin/customize');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update project.');
      });
  };

  return (
    <div className="update-form-container">
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          required
        />
        <textarea
          name="description"
          value={formData.projectDescription}
          onChange={handleChange}
          placeholder="Project Description"
          required
        />
        <input
          type="url"
          name="link"
          value={formData.url}
          onChange={handleChange}
          placeholder="Project Link"
        />

        <img src={imagePath} alt="projectImage"/>

        <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default UpdateProject;
