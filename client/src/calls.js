import { mockedLists } from './mockedLists';
import { mockedUsers } from './mockedUsers';

const USE_MOCK_DATA = true;

async function call(method, url, dtoIn = null, opts = {}) {
  if (USE_MOCK_DATA) {
    // Mock data handling
    switch (url) {
      case '/shoppingList/list':
        return Promise.resolve(mockedLists);
      case '/users':
        return Promise.resolve(mockedUsers);
      case '/mockedCreateList':
      case '/mockedUpdateList':
      case '/mockedDeleteList':
        return Promise.resolve({ success: true });
      default:
        throw new Error('Unknown mock URL');
    }
  } else {
    // Server handling
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dtoIn),
        ...opts
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Server Error');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network Error');
    }
  }
}


export async function loadUsers() {
  return await call('GET', '/users');
}

export async function loadLists() {
  return await call('GET', '/shoppingList/list');
}

export async function createList(dtoIn) {
  const url = USE_MOCK_DATA ? '/mockedCreateList' : 'http://127.0.0.1:8000/shoppingList/create';
  return await call('POST', url, dtoIn);
}

export async function updateList(dtoIn) {
  const url = USE_MOCK_DATA ? '/mockedUpdateList' : 'http://127.0.0.1:8000/shoppingList/update';
  return await call('POST', url, dtoIn);
}

export async function deleteList(dtoIn) {
  const url = USE_MOCK_DATA ? '/mockedDeleteList' : 'http://127.0.0.1:8000/shoppingList/delete';
  return await call('POST', url, dtoIn);
}