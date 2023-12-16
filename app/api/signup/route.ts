import { sql } from "@/service/DB/helpers";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    
    const json = await request.json();

    if(json.username === undefined){
       return NextResponse.json({error: "empty username."});
    }
    if(json.password === undefined){
        return NextResponse.json({error: "empty password."});
    }

    const username = json.username;
    const password = json.password;

    const res = await sql('select id, username from users where username ilike $1', [username]);

    if(!res.rowCount || res.rowCount > 0){
        return NextResponse.json({error: "user already exists."});
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    await sql('insert into users (username, password) values ($1, $2)', [username, hash]);

    return NextResponse.json({msg: "registration success."});
}