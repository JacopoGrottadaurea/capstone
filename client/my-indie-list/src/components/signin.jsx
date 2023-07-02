import React, { useState } from 'react';
import '../style/signin.css';

const SigninForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5020/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
        password
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  return (
    <div className="signin-form-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Registrati</h2>
        <label htmlFor="email">Email:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        /><br />
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
        <input type="submit" value="Registrati" />
      </form>
    </div>
  );
}

export default SigninForm;
