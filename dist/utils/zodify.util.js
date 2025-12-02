export function zodError(error) {
    const formatted = {};
    error.issues.forEach((issue) => {
        const field = issue.path.join(".");
        formatted[field] = issue.message;
    });
    return formatted;
}
