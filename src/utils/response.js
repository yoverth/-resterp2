export const successResponse = (res, data, message = "OK") => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, message = "Error", status = 500) => {
  return res.status(status).json({
    success: false,
    message,
  });
};
