import Cookies from "cookies";
export function setCookie(req, res, name, value, options = {}) {
    const cookies = new Cookies(req, res);
    cookies.set(name, value, {
        httpOnly: options.httpOnly ?? (process.env.COOKIE_HTTPONLY === "true"),
        secure: options.secure ?? (process.env.COOKIE_SECURE === "true"),
        sameSite: options.sameSite ?? (process.env.COOKIE_SAMESITE || "lax"),
        maxAge: options.maxAge ?? Number(process.env.COOKIE_MAXAGE || 86400000),
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
