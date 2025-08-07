import React, { useEffect, useState } from 'react';
import '../css/Admin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { toast } from 'react-toastify';

const LinkCard = ({ title }) => {
  const [demoLink, setDemoLink] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`/${title}/display`)
      .then((response) => {
        setDemoLink(response.data.data || []);
      })
      .catch((err) => {
        toast.error(`Failed to load ${title} links`);
        console.error(err);
        setDemoLink([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [title]);

  const handleUpdate = (linkId) => {
    if (title === 'Project') {
      navigate(`/admin/customize/update/Project/${linkId}`);
    } else {
      navigate(`/admin/customize/update/${title}/${linkId}`);
    }
  };

  const handleDelete = async (linkId) => {
    try {
      await axios.delete(`/${title}/delete/${linkId}`);
      toast.success(`${title} link deleted successfully`);
      setDemoLink(demoLink.filter(link => link._id !== linkId));
    } catch (err) {
      toast.error(`Failed to delete ${title} link`);
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="link-card-container shimmer">
        <div className="shimmer-content">
          <div className="shimmer-header"></div>
          <div className="shimmer-item"></div>
          <div className="shimmer-item"></div>
          <div className="shimmer-footer"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="link-card-container">
      <div className="link-card-header">
        <h2 className="link-card-title">
          {title === 'Project' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="link-card-icon">
              <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v2h10V7H7zm0 4v2h10v-2H7zm0 4v2h7v-2H7z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="link-card-icon">
              <path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z"/>
            </svg>
          )}
          {title} Links
        </h2>
        <p className="link-card-subtitle">Manage your {title.toLowerCase()} links</p>
      </div>

      <div className="link-list">
        {demoLink.length > 0 ? (
          demoLink.map((link) => (
            <div className="link-item" key={link._id}>
              <div className="link-content">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="link-title"
                >
                  {link.title}
                </a>
                {link.projectDescription && (
                  <p className="link-description">{link.projectDescription}</p>
                )}
              </div>
              <div className="link-actions">
                <button 
                  className="action-btn update-btn"
                  onClick={() => handleUpdate(link._id)}
                  aria-label={`Update ${link.title}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(link._id)}
                  aria-label={`Delete ${link.title}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <p>No {title.toLowerCase()} links available</p>
          </div>
        )}
      </div>

      <div className="link-footer">
        <Link 
          to={`/admin/customize/create/${title}`} 
          className="create-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
          Create {title} Link
        </Link>
      </div>
    </div>
  );
};

export default LinkCard;