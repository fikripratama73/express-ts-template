import Cookies from "cookies";
export function setCookie(req, res, name, value, options = {}) {
    const cookies = new Cookies(req, res);
    cookies.set(name, value, {
        httpOnly: options.httpOnly ?? true,
        secure: options.secure ?? process.env.NODE_ENV === "production",
        sameSite: options.sameSite ?? "lax",
        maxAge: options.maxAge ?? 24 * 60 * 60 * 1000, // default 1 hari
    });
}
export function getCookie(req, res, name) {
    const cookies = new Cookies(req, res);
    return cookies.get(name);
}
export function deleteCookie(req, res, name) {
    const cookies = new Cookies(req, res);
    cookies.set(name, "", { maxAge: 0 });
}
