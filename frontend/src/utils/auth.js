// Utilitários para autenticação e permissões

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUserInfo = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setUserInfo = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserInfo = () => {
  localStorage.removeItem("user");
};

export const isAdmin = () => {
  const user = getUserInfo();
  return user && user.isAdmin === true;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  removeToken();
  removeUserInfo();
  window.location.href = "/";
};

