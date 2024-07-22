import React, { createContext, useState, useEffect } from 'react';
import { loadUsers } from './calls';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUsers().then(data => {
      setUsers(data);
      const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
      setUser(alreadyLogged ?? data.find(user => user.id === 0));
      setIsLoggedIn(!!alreadyLogged);
    }).catch(error => console.error('Error fetching data:', error));
  }, []);

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
    if (user && user.id === ownerId)
      return true;
    return false;
  };

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        isLoggedIn,
        changeUser,
        canEdit,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;