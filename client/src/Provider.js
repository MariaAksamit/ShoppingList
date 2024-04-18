import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function Provider({ children })  {
 const [users, setUsers] = useState([]);
 const [darkMode, setDarkMode] = useState(false); // pridanie stavu pre dark/light mode

  useEffect(() => {
    fetch('http://127.0.0.1:8000/users')
       .then(response => response.json())
       .then(data => setUsers(data))
       .catch(error => console.error('Error fetching data:', error));

  }, []);

  const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!alreadyLogged);
  const [user, setUser] = useState(alreadyLogged ?? users.find(user => user.id === 0));
  
  const changeUser = (userId) => {
    const selectedUser = users.find(user => user.id === userId);
    if (selectedUser) {
      setUser(selectedUser);
      sessionStorage.setItem('authUser', JSON.stringify(selectedUser));
      setIsLoggedIn(selectedUser.id !== 0);
    } else {
        setUser(null); 
        sessionStorage.removeItem('authUser');
        setIsLoggedIn(false);
    }
  };

  const canEdit = (ownerId) => {
    if (user.id === ownerId)
      return true;
    return false;
  };

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

return (
  <UserContext.Provider 
    value = {{ 
      user, 
      users, 
      isLoggedIn,
      changeUser,
      canEdit,
      darkMode,
      toggleDarkMode
    }}
      >
        {children}
    </UserContext.Provider>
  );
};

export default UserContext;