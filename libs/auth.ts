import "server-only";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function getUser() {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET) as {
      userId: string;
      email: string;
    };
  } catch {
    return null;
  }
}