export const isEmpty = (value) => {
  return !value || value.trim() === "";
};

export const isEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};
