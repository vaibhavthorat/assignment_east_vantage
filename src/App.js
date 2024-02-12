import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App= () => {
  const [userData, setUserData] = useState({ fullName: '', email: ''})
  const fetchUser = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const { results } = response.data;
        const { name, email } = results[0];
        setUserData({ fullName:`${name.first} ${name.last}`, email });
        localStorage.setItem('newuser', JSON.stringify({ fullName:`${name.first} ${name.last}`, email  }));
    } catch (error) {
      console.error('Something is Wrong:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleRefresh = () => {
    localStorage.removeItem('newuser');
    fetchUser();
  };

  return (
    <div>
      <h1>Fetch Random Users</h1>
      {userData ? (
        <div>
          <p>Full Name: {userData.fullName}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};
export default App;