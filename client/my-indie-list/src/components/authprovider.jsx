import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessTokenState] = useState(null);
  const isAuthenticated = accessToken !== null;


  const setAccessToken = (value) => {
    setAccessTokenState(value);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setAccessToken(accessToken);
  }, []);

  const login = async (username, password) => {
    console.log('Valori di username e password:', username, password);
    try {
      // Invia una richiesta POST al server con le credenziali dell'utente
      const response = await fetch('http://localhost:5020/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `${username}`,
          password: `${password}`,
        }),
      });
      console.log('Risposta del server:', response);
  
      const data = await response.json();
      console.log('Dati ricevuti dal server:', data);
  
      // Se l'accesso è stato effettuato con successo, salva i token nel client
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
  
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        // Imposta il valore di accessToken nello stato del componente
        setAccessToken(accessToken);
      } else {
        // Se il valore di accessToken è null, non salvare nulla nel localStorage e imposta il valore di accessToken su null
        setAccessToken(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const logout = () => {
    // Rimuove il token di accesso dallo stato
    setAccessToken(null);

    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}