import * as turf from '@turf/turf';
const localStorageKey = 'myAppCache';
let cache: { [key: string]: any } = {};

// // Initialize the cache from local storage
// const cachedDataFromLocalStorage = localStorage.getItem(localStorageKey);
// if (cachedDataFromLocalStorage) {
//   try {
//     cache = JSON.parse(cachedDataFromLocalStorage);
//   } catch (error) {
//     console.error('Error parsing cached data from local storage:', error);
//   }
// }

export const updateCache = (key: string, value: any) => {
  ('caching...')
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromCache = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }
  return JSON.parse(item);
};

export const clearCache = () => {
  cache = {};

  // Clear the cache in local storage
  localStorage.removeItem(localStorageKey);
};