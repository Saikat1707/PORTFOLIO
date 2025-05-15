import React, { useState, createContext } from 'react';

export const DataContext = createContext();

const UserContext = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  return (
    <DataContext.Provider value={{ isAuthenticate, setIsAuthenticate }}>
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;
