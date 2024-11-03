import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ProfileScreen() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setDisplayName(auth.currentUser.displayName || '');
      setEmail(auth.currentUser.email);
    } else {
      navigate('/'); // Redirect to Auth screen if not logged in
    }
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName });
      // You could also update the email if needed (remember to re-authenticate if changing the email)
      // await updateEmail(auth.currentUser, newEmail);
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="Username"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled // Disable email change for now (can implement later with re-authentication)
        />
        <button type="submit">Update Profile</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ProfileScreen;
