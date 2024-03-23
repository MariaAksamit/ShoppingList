import React, { createContext, useState } from 'react';

const UserContext = createContext();

export function Provider({ children })  {
  
  const users = [
    {
      "id": 0,
      "name": "Logout",
    },
    {
      "id": 1,
      "name": "Cassandra Clare",
    },
    {
      "id": 2,
      "name": "Jace Wayland",
    },
    {
      "id": 3,
      "name": "Jocelyn Morgernstern",
    },
    {
      "id": 4,
      "name": "Alec Lightwood",
    },
    {
      "id": 5,
      "name": "Clary Fairchild",
    },
    {
      "id": 6,
      "name": "Hodge Starkweather",
    },
    {
      "id": 7,
      "name": "Simon Lewis",
    },
    {
      "id": 8,
      "name": "Magnus Bane",
    },
    {
      "id": 9,
      "name": "Isabelle Lightwood",
    },
    {
      "id": 10,
      "name": "Aline Penhallow",
    },
    {
      "id": 11,
      "name": "Julian Blackthorn",
    },
  ];

  const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!alreadyLogged);
  const [user, setUser] = useState(alreadyLogged ?? users.find(user => user.id === 0));
  
  const changeUser = (userId) => {
    const selectedUser = users.find(user => user.id === userId);
    if (selectedUser) {
      setUser(selectedUser);
      sessionStorage.setItem('authUser', JSON.stringify(selectedUser));
      if (selectedUser.id !== 0) {
        setIsLoggedIn(true);
      } else 
        setIsLoggedIn(false);
      }
  };

return (
  <UserContext.Provider 
    value = {{ 
      user, 
      users, 
      isLoggedIn,
      changeUser, 
    }}
      >
        {children}
    </UserContext.Provider>
  );
};

export default UserContext;