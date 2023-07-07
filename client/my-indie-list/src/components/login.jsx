import React, { useState } from 'react';
import '../style/login.css';
import { useContext } from 'react';
import { AuthContext } from './authprovider';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log('Valori inseriti:', username, password);
  
    try {
      // Utilizza la funzione login fornita da AuthProvider per autenticare l'utente
      await login(username, password);
      window.location.href = '/protected';
    } catch (error) {
      console.error(error);
      // Gestisci gli errori di accesso (ad esempio, mostrando un messaggio all'utente)
    }
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Nome utente:</label><br />
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        /><br />
        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        /><br /><br />
        <input type="submit" value="Accedi" />
      </form>
    </div>
  );
}

export default LoginForm;
