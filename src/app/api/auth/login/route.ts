import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  console.log(email, password);
  const userdata = await prisma.users.findMany();
  return NextResponse.json({ data: { userdata }, message: "Not exist" }, { status: 400 });
}
