import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const ListContext = createContext();

export function ListProvider({ children })  {
  const { t } = useTranslation();

  const [lists, setLists] = useState([]);
  const [status, setStatus] = useState({
    state: "pending",
  });

  const fetchList = () => {
    setStatus({ state: "pending" })
    fetch('http://127.0.0.1:8000/shoppingList/list')
       .then(response => {
          if (!response.ok) {
            throw new Error(t('Error loading data'));
          }
          return response.json();
       })
       .then(data => {
          setLists(data);
          setStatus({ state: "success" });
       })
       .catch(error => {
          console.error(t('Error loading data:'), error);
          setStatus({ state: "error", error });
       });
  };

  const createList = async (newList, callback) => {
    try {
      setStatus({ state: "pending" })
      const response = await fetch('http://127.0.0.1:8000/shoppingList/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newList),
      });
      if (response.ok) {
        setStatus({ state: "success" });
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        const errorData = await response.json();
        setStatus({ state: "error", error: errorData });
      };

      } catch (error) {
        setStatus({ state: "error", error: error.message });
        console.error('Error creating list:', error);
      } finally {
      }   
  };

  const updateList = async (updatedList, callback) => {
    try {
      setStatus({ state: "pending" })
      const response = await fetch("http://127.0.0.1:8000/shoppingList/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedList),
      });
      if (response.ok) {
        setStatus({ state: "success" });
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        const errorData = await response.json();
        setStatus({ state: "error", error: errorData });
      }
      } catch (error) {
        setStatus({ state: "error", error: error.message });
      } finally {
      }
  };

  const deleteList = async (requestData, callback ) => {
    setStatus({ state: "pending" })
    try {
      const response = await fetch('http://127.0.0.1:8000/shoppingList/delete', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        setStatus({ state: "success" });
        console.log("List deleted successfully.");
      if (typeof callback === 'function') {
          callback();
        }
      } else {
        const errorData = await response.json();
        setStatus({ state: "error", error: errorData });
        console.error("Error deleting list.:", errorData);
      }
    } catch (error) {
      setStatus({ state: "error", error: error.message });
      console.error("Error deleting list:", error);
    } finally {

    }
  };

  return (
    <ListContext.Provider value={{
      status,
      lists,
      fetchList,
      setStatus,
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