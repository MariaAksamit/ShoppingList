import React, { createContext, useState, useEffect } from 'react';
import { toggleMock } from './calls';


const UserContext = createContext();

export function UserProvider({ children })  {
 const [users, setUsers] = useState([]);
 const [darkMode, setDarkMode] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [user, setUser] = useState(null);

 useEffect(() => {
  if (!toggleMock()) {
    // Server
    fetch('http://127.0.0.1:8000/users')
       .then(response => response.json())
       .then(data => {
         setUsers(data);
         const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
         setUser(alreadyLogged ?? data.find(user => user.id === 0));
         setIsLoggedIn(!!alreadyLogged);
       })
       .catch(error => console.error('Error fetching data:', error));
  } else {
    // Mock
    setUsers(mockedUsers); 
    const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
    setUser(alreadyLogged ?? mockedUsers.find(user => user.id === 0)); 
    setIsLoggedIn(!!alreadyLogged);
  }
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
    value = {{ 
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

const mockedUsers = [
  {
    "id": "012f5e1c",
    "name": "Tessa Gray"
  },
  {
    "id": "02743d9e",
    "name": "William Herondale"
  },
  {
    "id": "03b0e8d7",
    "name": "Charlotte Branwell"
  },
  {
    "id": "041a3c9b",
    "name": "Jessamine Lovelace"
  },
  {
    "id": "05f7c4a9",
    "name": "Emma Carstairs"
  },
  {
    "id": "069d7e0f",
    "name": "Cassandra Clare"
  },
  {
    "id": "07c6d1e2",
    "name": "Jace Wayland"
  },
  {
    "id": "082b6d4a",
    "name": "Jocelyn Morgernstern"
  },
  {
    "id": "099e3a8b",
    "name": "Alec Lightwood"
  },
  {
    "id": "10e6f8c7",
    "name": "Clary Fairchild"
  },
  {
    "id": "114b1d9f",
    "name": "Hodge Starkweather"
  },
  {
    "id": "122f8c7a",
    "name": "Simon Lewis"
  },
  {
    "id": "13d4a7e5",
    "name": "Magnus Bane"
  },
  {
    "id": "146f2e8b",
    "name": "Isabelle Lightwood"
  },
  {
    "id": "155d7f9e",
    "name": "Aline Penhallow"
  }
]

export default UserContext;