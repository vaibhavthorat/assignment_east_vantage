import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App= () => {
  const [username, setUsername] = useState('')
  const [useremail, setUseremail] = useState('')
  const fetchUser = async () => {
      const response = await axios.get('https://randomuser.me/api');
      const data = await response.data;
        const { name, email } = data.results[0];
        setUsername(`${name.first} ${name.last}`);
        setUseremail(email);
        localStorage.setItem('newuser', JSON.stringify({ UserName:`${name.first} ${name.last}`, email  }));
    }
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
      {user ? (
        <div>
          <p>Full Name: {user.fullName}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};
export default App;