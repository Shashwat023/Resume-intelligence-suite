import { type NextRequest, NextResponse } from "next/server"
import { sign, verify } from "jsonwebtoken"

export type AuthUser = {
  userId: string
  email: string
  name?: string
  avatarUrl?: string
}

type AuthTokenPayload = AuthUser & {
  iat?: number
  exp?: number
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const JWT_EXPIRY = "7d"
const AUTH_COOKIE_NAME = "auth_token"

export function createAuthToken(user: AuthUser) {
  return sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRY })
}

export function getUserFromRequest(req: NextRequest): AuthUser | null {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value
  if (!token) return null

  try {
    const payload = verify(token, JWT_SECRET) as AuthTokenPayload
    if (!payload?.email || !payload?.userId) return null
    return {
      userId: payload.userId,
      email: payload.email,
      name: payload.name,
      avatarUrl: payload.avatarUrl,
    }
  } catch {
    return null
  }
}

export function setAuthCookie(res: NextResponse, token: string) {
  res.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export function clearAuthCookie(res: NextResponse) {
  res.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
}
