export const sendSuccess = <T = unknown>(message: string, data?: T) => ({
  success: true,
  message,
  data: data ?? null,
});

export const sendError = <T = unknown>(message: string, errors?: T) => ({
  success: false,
  message,
  errors: errors ?? null,
});
