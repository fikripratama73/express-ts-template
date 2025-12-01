export const sendSuccess = (message, data) => ({
    success: true,
    message,
    data: data ?? null,
});
export const sendError = (message, errors) => ({
    success: false,
    message,
    errors: errors ?? null,
});
