import { sql } from "@/service/DB/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');


    if(!username){
        return NextResponse.json({error: "username filter required."}, {status: 409});
    }
    const statement = "select id, username, avatar from users where username ilike $1";
    const values = [username];
    const res = await sql(statement, values);

    return NextResponse.json({data: res.rows});
}