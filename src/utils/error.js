export const handleError = (res, error) => {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
};
