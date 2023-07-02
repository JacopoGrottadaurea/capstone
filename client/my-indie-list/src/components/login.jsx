import React, { useState } from 'react';
import '../style/login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Qui puoi gestire l'invio dei dati al server
    console.log(`Username: ${username}, Password: ${password}`);
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
