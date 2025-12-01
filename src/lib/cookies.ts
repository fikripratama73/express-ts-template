import Cookies from "cookies"
import type { Request, Response } from "express";

interface CookieOptions {
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
}

export function setCookie(req: Request, res: Response, name: string, value: string, options: CookieOptions = {}) {
    const cookies = new Cookies(req, res);

    cookies.set(name, value, {
        httpOnly: options.httpOnly ?? (process.env.COOKIE_HTTPONLY === "true"),
        secure: options.secure ?? (process.env.COOKIE_SECURE === "true"),
        sameSite: options.sameSite ?? (process.env.COOKIE_SAMESITE as any || "lax"),
        maxAge: options.maxAge ?? Number(process.env.COOKIE_MAXAGE || 86400000),
    });
}

export function getCookie(req: Request, res: Response, name: string): string | undefined {
  const cookies = new Cookies(req, res);
  return cookies.get(name);
}

export function deleteCookie(req: Request, res: Response, name: string) {
  const cookies = new Cookies(req, res);
  cookies.set(name, "", { maxAge: 0 });
}