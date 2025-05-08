import React, { useEffect, useState } from 'react';
import '../css/Admin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';

const LinkCard = ({ title }) => {
  const [demoLink, setDemoLink] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/${title}/display`)
      .then((response) => {
        console.log(response.data.data);
        setDemoLink(response.data.data || []); 
      })
      .catch((err) => {
        console.log(err);
        setDemoLink([]); 
      });
  }, [title]); 

  const handleUpdate = (e) => {
    const linkId = e.target.value
    console.log(linkId);
    if(title == 'Project'){
      navigate(`/admin/customize/update/Project/${linkId}`);
    }else{
      navigate(`/admin/customize/update/${title}/${linkId}`);
    }
     
  }

  const handleDelete = (e) => {
    const linkId = e.target.value
    console.log(linkId);
    axios.delete(`/${title}/delete/${linkId}`)
      .then((response) => {
        console.log(response.data.message);
        setDemoLink(demoLink.filter(link => link._id !== linkId)); 
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="link-card-container">
      <h2>{title} Links</h2>

      <div className="link-list">
        {Array.isArray(demoLink) && demoLink.length > 0 ? (
          demoLink.map((link) => (
            <div className="link-item" key={link._id}>
              <a href={link.url} target="_blank" rel="noreferrer">{link.title}</a>
              <div className="link-actions">
                <button className="update-btn" value={link._id} onClick={handleUpdate}>Update</button>
                <button className="delete-btn" value={link._id} onClick={handleDelete}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No links available</p>
        )}
      </div>

      <div className="link-footer">
        <button className="create-btn">
          <Link to={`/admin/customize/create/${title}`}>Create {title} Link</Link>
        </button>
      </div>
    </div>
  );
};

export default LinkCard;
