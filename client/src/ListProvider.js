import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadLists, createList, updateList, deleteList } from './calls';

const ListContext = createContext();

export function ListProvider({ children }) {
  const { t } = useTranslation();
  const [lists, setLists] = useState([]);
  const [status, setStatus] = useState({
    state: "pending",
  });

  const fetchList = async () => {
    setStatus({ state: "pending" });
    try {
      const data = await loadLists();
      setLists(data);
      setStatus({ state: "success" });
    } catch (error) {
      console.error(t('Error loading data:'), error);
      setStatus({ state: "error", error });
    }
  };

  const handleCreateList = async (newList, callback) => {
    try {
      await createList(newList);
      callback && callback();
      fetchList();
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const handleUpdateList = async (updatedList, callback) => {
    try {
      await updateList(updatedList);
      callback && callback();
      fetchList();
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  const handleDeleteList = async (requestData, callback) => {
    try {
      await deleteList(requestData);
      callback && callback();
      fetchList();
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  return (
    <ListContext.Provider value={{
      status,
      lists,
      fetchList,
      createList: handleCreateList,
      updateList: handleUpdateList,
      deleteList: handleDeleteList
    }}>
      {children}
    </ListContext.Provider>
  );
};

export function useList() {
  return useContext(ListContext);
};