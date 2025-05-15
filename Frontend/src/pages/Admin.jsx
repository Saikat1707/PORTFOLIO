import React, { useContext, useEffect } from 'react';
import '../css/Admin.css';
import Profile from '../components/Profile';
import LinkCard from '../components/LinkCard';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/UserContext';

const Admin = () => {
  const { isAuthenticate } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticate) {
      navigate('/admin/customize/login');
    }
  }, [isAuthenticate, navigate]);

  return (
    <div className="AdminContainer">
      <Profile />
      <LinkCard title="Programming" />
      <LinkCard title="Social" />
      <LinkCard title="Project" />
    </div>
  );
};

export default Admin;
