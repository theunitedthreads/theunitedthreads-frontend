export const setToSessionStorage = (key, token) => {
  if (!key || typeof window === undefined) {
    return;
  }
  return sessionStorage.setItem(key, JSON.stringify(token));
};

export const getFromSessionStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return;
  }
  return JSON.parse(sessionStorage.getItem(key));
};

export const removeFromSessionStorage = (key) => {
  if (!key || typeof window === "undefined") return;

  return sessionStorage.removeItem(key);
};
