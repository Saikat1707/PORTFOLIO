import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminLogin.css';
import { DataContext } from '../context/UserContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setIsAuthenticate } = useContext(DataContext); // ✅ Moved here

  const handleLogin = (e) => {
    e.preventDefault();

    const validEmail = 'berasaikat731@gmail.com';
    const validPassword = 'Saikat123@';

    if (email === validEmail && password === validPassword) {
      setIsAuthenticate(true);
      navigate(`/admin/customize`);
    } else {
      setIsAuthenticate(false);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
