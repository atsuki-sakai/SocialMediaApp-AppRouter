import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const response = NextResponse.json({msg: "logout success."});

    response.cookies.set("jwt-token", "");
    return response;

}