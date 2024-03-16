import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function Provider({ children })  {
  const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));

  const roles = [
    {
      id: 0,
      name: "LoggedIn"
    },
    {
      id: 1,
      name: "Owner"
    },
    {
      id: 2,
      name: "Member"
    }
  ];
  
  const users = [
    {
      "id": 1,
      "name": "Cassandra Clare",
      "role": roles[1]
    },
    {
      "id": 2,
      "name": "Jace Wayland",
      "role": roles[2]
    },
    {
      "id": 3,
      "name": "Jocelyn Morgernstern",
      "role": roles[2]
    },
    {
      "id": 4,
      "name": "Alec Lightwood",
      "role": roles[2]
    },
    {
      "id": 5,
      "name": "Clare Fairchild",
      "role": roles[0]
    },
    {
      "id": 6,
      "name": "Hodge Starkweather",
      "role": roles[0]
    }
];

const [user, setUser] = useState(alreadyLogged ?? {
  role: roles[0]
});

const changeUser = (id) => {
  const user = users.find(user => user.id === id);
  const result = user ?? {
      role: roles[0]
  };
  setUser(result);
  sessionStorage.setItem('authUser', JSON.stringify(result));
};

const isLoggedIn = () => {
  return user.role.id === 0;
}

const isOwner = () => {
  return user.role.id === 1;
}

const isMember = () => {
  return user.role.id === 2;
}

const canShowDetail = () => {
  if (isOwner() || isMember())
    return true;
  return false;
};

const canEdit = () => {
  if (user.role.id === 1)
    return true;
  return false;
};

  return (
    <UserContext.Provider 
      value = {{ 
        user, 
        users, 
        changeUser, 
        isLoggedIn,
        isOwner,
        isMember,
        canShowDetail,
        canEdit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;