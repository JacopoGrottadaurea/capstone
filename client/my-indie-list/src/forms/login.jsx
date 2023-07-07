import React, { useState } from 'react';
import '../style/login.css';
import { useContext } from 'react';
import { AuthContext } from '../components/authprovider';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log('Valori inseriti:', username, password);
  
    try {
      // Utilizza la funzione login fornita da AuthProvider per autenticare l'utente
      await login(username, password);
      // window.location.href = '/protected';
      
    } catch (error) {
      console.error(error);
      // Gestisci gli errori di accesso (ad esempio, mostrando un messaggio all'utente)
      setLoginError('Nome utente o password non validi');
    }
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {loginError && <p>{loginError}</p>}
        <label htmlFor="username">Nome utente:</label><br />
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        /><br />
        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        /><br /><br />
        <input type="submit" value="Accedi" />
      </form>
    </div>
  );
}

export default LoginForm;
