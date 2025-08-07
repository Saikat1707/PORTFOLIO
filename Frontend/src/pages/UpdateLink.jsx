import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/UpdateLink.css';
import { toast } from 'react-toastify';

const UpdateLink = () => {
  const { title, linkId } = useParams();
  const navigate = useNavigate();
  const [linkData, setLinkData] = useState({
    title: '',
    url: ''
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/${title}/display/${linkId}`)
      .then((res) => {
        const { title, url } = res.data.data;
        setLinkData({ title, url });
      })
      .catch((err) => {
        toast.error('Failed to fetch link data');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [title, linkId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinkData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    axios.put(`/${title}/update/${linkId}`, linkData)
      .then((res) => {
        toast.success(`${title} link updated successfully!`);
        navigate(`/admin/customize/`);
      })
      .catch((err) => {
        toast.error(`Failed to update ${title} link`);
        console.error(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="update-container">
      {/* Loading overlay for initial data fetch */}
      {loading && (
        <div className="overlay-loader">
          <div className="spinner"></div>
          <p className="loader-text">Loading {title} data...</p>
        </div>
      )}

      <div className="update-card">
        <div className="update-header">
          <h2 className="update-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="update-icon">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
            Update {title} Link
          </h2>
          <p className="update-subtitle">Edit the details below to update your {title.toLowerCase()} link</p>
        </div>

        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label htmlFor="title">Link Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className='text-black'
              value={linkData.title}
              onChange={handleChange}
              placeholder="e.g., My Portfolio"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Destination URL</label>
            <input
              type="url"
              id="url"
              name="url"
              className='text-black'
              value={linkData.url}
              onChange={handleChange}
              placeholder="https://example.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner-btn"></span>
                Updating...
              </>
            ) : (
              'Update Link'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateLink;