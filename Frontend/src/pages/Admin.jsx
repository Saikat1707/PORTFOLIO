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
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="dashboard-icon">
            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
          </svg>
          Admin Dashboard
        </h1>
        <p className="dashboard-subtitle">Manage your profile and links</p>
      </header>

      <div className="dashboard-content">
        <aside className="profile-sidebar">
          <Profile />
        </aside>

        <main className="links-main">
          <div className="links-grid">
            <LinkCard title="Programming" />
            <LinkCard title="Social" />
            <LinkCard title="Project" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;