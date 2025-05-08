import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/UpdateLink.css'
const UpdateLink = () => {
  const { title, linkId } = useParams();
  const navigate = useNavigate();
  const [linkData, setLinkData] = useState({
    title: '',
    url: ''
  });

  useEffect(() => {
    axios.get(`/${title}/display/${linkId}`)
      .then((res) => {
        const { title, url } = res.data.data;
        setLinkData({ title, url });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [title, linkId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinkData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/${title}/update/${linkId}`, linkData)
      .then((res) => {
        console.log(res.data.message);
        alert('Link updated successfully!');
        navigate(`/admin/customize/`);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to update link.');
      });
  };

  return (
    <div className="update-form-container">
      <h2>Update {title} Link</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={linkData.title}
          onChange={handleChange}
          placeholder="Enter title"
          required
        />
        <input
          type="url"
          name="url"
          value={linkData.url}
          onChange={handleChange}
          placeholder="Enter URL"
          required
        />
        <button type="submit">Update Link</button>
      </form>
    </div>
  );
};

export default UpdateLink;
