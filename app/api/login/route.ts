import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const json = await request.json();
    return NextResponse.json(json);
}