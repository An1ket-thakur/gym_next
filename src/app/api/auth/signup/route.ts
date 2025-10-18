import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, password } = body;
  const userdata = await prisma.users.create({
    data: { email, username, password },
  });
  if (userdata) return NextResponse.json({ data: { userdata }, message: "created" }, { status: 200 });
}
