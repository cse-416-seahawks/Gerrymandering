const localStorageKey = 'myAppCache';
let cache: { [key: string]: any } = {};

// Initialize the cache from local storage
const cachedDataFromLocalStorage = localStorage.getItem(localStorageKey);
if (cachedDataFromLocalStorage) {
  try {
    cache = JSON.parse(cachedDataFromLocalStorage);
  } catch (error) {
    console.error('Error parsing cached data from local storage:', error);
  }
}

export const updateCache = (key: string, value: any) => {
  cache[key] = value;

  // Save the updated cache to local storage
  localStorage.setItem(localStorageKey, JSON.stringify(cache));
};

export const getFromCache = (key: string) => {
  return cache[key];
};

export const clearCache = () => {
  cache = {};

  // Clear the cache in local storage
  localStorage.removeItem(localStorageKey);
};