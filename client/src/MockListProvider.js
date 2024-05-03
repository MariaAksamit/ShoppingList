import React, { createContext, useContext, useState } from 'react';
import listsData from './mock/lists.json';
import usersData from './mock/users.json';

const MockListContext = createContext();

export function MockListProvider({ children })  {
  const [lists, setLists] = useState(listsData); // Načítanie zoznamov z mock dát
  const [users, setUsers] = useState(usersData); // Načítanie používateľov z mock dát

  const [status, setStatus] = useState({
    state: "success",
  });

  const fetchList = () => {
    setStatus({ state: "success" });
    return Promise.resolve(lists); // Vráti mockované údaje
  };

  const createList = async (newList, callback) => {
    // Simulácia vytvorenia nového zoznamu
    const newListWithId = { ...newList, id: lists.length + 1 };
    setLists([...lists, newListWithId]);
    return Promise.resolve(newListWithId);
  };

  const updateList = async (updatedList, callback) => {
    // Simulácia aktualizácie existujúceho zoznamu
    setLists(lists.map(list => (list.id === updatedList.id ? updatedList : list)));
    return Promise.resolve(updatedList);
  };

  const deleteList = async (listId, callback) => {
    // Simulácia odstránenia zoznamu
    setLists(lists.filter(list => list.id !== listId));
    return Promise.resolve();
  };

  return (
    <MockListContext.Provider value={{
      status,
      lists,
      users,
      fetchList,
      setStatus,
      createList,
      updateList,
      deleteList
    }}>
      {children}
    </MockListContext.Provider>
  );
};

export function useMockList() {
  return useContext(MockListContext);
};