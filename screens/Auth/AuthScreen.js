// screens/Auth/AuthScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true); // State to toggle between login and register
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>{isLoginMode ? "Login" : "Register"}</h2>
      <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
        {!isLoginMode && (
          <input
            type="text"
            placeholder="Username"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required={!isLoginMode}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLoginMode ? "Login" : "Register"}</button>
      </form>
      <p>
        {isLoginMode
          ? "Don't have an account? "
          : "Already have an account? "}
        <button onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? "Register" : "Login"}
        </button>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AuthScreen;
