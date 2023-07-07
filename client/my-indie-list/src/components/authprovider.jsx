import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessTokenState] = useState(null);
  const isAuthenticated = accessToken !== null;

  const setAccessToken = (value) => {
    console.log('Nuovo valore di accessToken:', value);
    setAccessTokenState(value);
  };

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
      console.log('Valori di accessToken e refreshToken:', accessToken, refreshToken);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Imposta il valore di accessToken nello stato del componente
      setAccessToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };


  const logout = () => {
    // Rimuove il token di accesso dallo stato
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
