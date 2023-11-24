import React, { useContext,useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './Context/AuthContext';
import {jwtDecode }from 'jwt-decode';
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user,login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      let decodedToken = jwtDecode(token);
      let userData = {
        role:decodedToken['role'],
        id: decodedToken['id'],
        lab: decodedToken['lab'],
        username:decodedToken['username'],
        email:decodedToken['email']
      };
      login(userData);
    } catch (error) {
      console.error("Invalid or expired token", error);
      // Handle invalid or expired token
    } finally {
      setLoading(false);
    }
  } else {
    setLoading(false);
  }
}, []);

if (loading) {
  // You can render a loading spinner or some indication that authentication is in progress
  return <div>Loading...</div>;
}

  // Check if the user has one of the allowed roles
  if (user && allowedRoles.includes(user.role)) {
    return element;
  } else {
    // Redirect to a login page or another route
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;