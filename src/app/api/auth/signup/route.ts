import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
  return `${salt}:${derivedKey}`;
}

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();
    console.log(email, password, username);
    if (!email || !password || !username) {
      return NextResponse.json({ message: "Username, Email and password required" }, { status: 400 });
    }

    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = hashPassword(password);

    await prisma.users.create({ data: { email, password: hashedPassword, username } });

    return NextResponse.json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Error during registration:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
