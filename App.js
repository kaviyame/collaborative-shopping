import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import HomeScreen from './screens/Home/HomeScreen';
import AuthScreen from './screens/Auth/AuthScreen';
import ProfileScreen from './screens/Profile/ProfileScreen'; // Import the ProfileScreen

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <AuthScreen />} />
        <Route path="/home" element={user ? <HomeScreen /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <ProfileScreen /> : <Navigate to="/" />} /> {/* Profile route */}
      </Routes>
    </Router>
  );
}

export default App;
