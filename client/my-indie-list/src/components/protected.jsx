import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './authprovider';

export function ProtectedRouteProvider({ children }) {
  const [username, setUsername] = useState('');
  // const [profilepicture, setProfilePicture] = useState('');
  const authContextValue = useContext(AuthContext);
  const { accessToken } = authContextValue;

const fetchUserData = () => {
  // Recupera i dati dell'utente dal server
  fetch('http://localhost:5020/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setUsername(data.username);
      localStorage.setItem('username', data.username);
    });
};

  // Aggiunge i nuovi valori al valore esistente di AuthContext
  const newAuthContextValue = {
    ...authContextValue,
    fetchUserData,
    username,
    //profilepicture,
  };

  return (
    <AuthContext.Provider value={newAuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
