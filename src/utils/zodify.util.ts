import { ZodError } from "zod";

export function zodError(error: ZodError) {
    const formatted: Record<string, string> = {};

    error.issues.forEach((issue) => {
        const field = issue.path.join(".");
        formatted[field] = issue.message;
    });

    return formatted;
}
