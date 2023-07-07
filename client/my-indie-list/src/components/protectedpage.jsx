import React, { useContext } from 'react';
import { AuthContext } from './authprovider';

const ProtectedPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log('Valore di isAuthenticated:', isAuthenticated);


  return isAuthenticated ? (
    // Replace this with the component you want to render when the user is authenticated
    <div>You are authenticated</div>
  ) : (
    <div>You are not authenticated</div>
  );
};

export default ProtectedPage;
