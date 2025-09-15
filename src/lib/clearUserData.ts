export const clearUserData = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key !== 'theme') {
      localStorage.removeItem(key);
    }
  });
};
