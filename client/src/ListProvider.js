import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ListContext = createContext();

export function ListProvider({ children })  {
  const { t } = useTranslation();

  const [lists, setLists] = useState([]);
  const [status, setStatus] = useState({
    state: "pending",
  });

  const serverCall = async (url, requestData, method, errorCallback) => {
    try {
      setStatus({ state: "pending" });
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        setStatus({ state: "success" });
        return await response.json();
      } else {
        const errorData = await response.json();
        setStatus({ state: "error", error: errorData });
        errorCallback && errorCallback(errorData);
      }
    } catch (error) {
      setStatus({ state: "error", error: error.message });
      console.error("Error:", error);
    }
  };

  const fetchList = async () => {
    setStatus({ state: "pending" });
    try {
      const response = await fetch('http://127.0.0.1:8000/shoppingList/list');
      if (!response.ok) {
        throw new Error(t('Error loading data'));
      }
      const data = await response.json();
      setLists(data);
      setStatus({ state: "success" });
    } catch (error) {
      console.error(t('Error loading data:'), error);
      setStatus({ state: "error", error });
    }
  };

  const createList = async (newList, callback) => {
    await serverCall('http://127.0.0.1:8000/shoppingList/create', newList, 'POST', error => {
      console.error('Error creating list:', error);
    });
    callback && callback();
  };

  const updateList = async (updatedList, callback) => {
    await serverCall('http://127.0.0.1:8000/shoppingList/update', updatedList, 'POST', error => {
      console.error('Error updating list:', error);
    });
    callback && callback();
  };

  const deleteList = async (requestData, callback) => {
    await serverCall('http://127.0.0.1:8000/shoppingList/delete', requestData, 'POST', error => {
      console.error('Error deleting list:', error);
    });
    callback && callback();
  };

  return (
    <ListContext.Provider value={{
      status,
      lists,
      fetchList,
      createList,
      updateList,
      deleteList
    }}>
      {children}
    </ListContext.Provider>
  );
};

export function useList() {
  return useContext(ListContext);
};