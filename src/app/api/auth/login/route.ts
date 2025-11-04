import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(":");
  const derivedKey = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
  return key === derivedKey;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User does not exist" }, { status: 404 });
    }
    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.user_id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user.user_id, email: user.email },
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
