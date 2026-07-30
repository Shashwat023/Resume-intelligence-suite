import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto"

const ITERATIONS = 120_000
const KEYLEN = 32
const DIGEST = "sha256"

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString("hex")
  return `${ITERATIONS}:${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string) {
  const [iterStr, salt, expectedHex] = stored.split(":")
  const iterations = Number(iterStr)
  if (!iterations || !salt || !expectedHex) return false

  const derived = pbkdf2Sync(password, salt, iterations, KEYLEN, DIGEST)
  const expected = Buffer.from(expectedHex, "hex")
  if (expected.length !== derived.length) return false
  return timingSafeEqual(expected, derived)
}
