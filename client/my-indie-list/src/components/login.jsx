import React, { useState } from 'react';
import '../style/login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Invia una richiesta POST al server con le credenziali dell'utente
      const response = await fetch('http://localhost:5020/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      // Se l'accesso è stato effettuato con successo, salva il token nel client
      const token = data.token;
      localStorage.setItem('token', token);

      // Reindirizza l'utente alla pagina protetta
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
