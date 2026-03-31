export const getCurrentDate = () => {
  return new Date();
};

export const formatDate = (date) => {
  return new Date(date).toISOString();
};
