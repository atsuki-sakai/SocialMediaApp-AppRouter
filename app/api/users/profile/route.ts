import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/service/DB/helpers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    try {
        const jwtPayload = await getJWTPayload();
        const res = await sql(
            'select id, username, avatar from users where id = $1',
            [jwtPayload.sub]
        );
        const user = res.rows[0];
        if(!user){
            return NextResponse.json({msg: "user not defined..."}, {status: 409})
        }
        return NextResponse.json({data: user});
    }catch(e){
        return NextResponse.json({meg: "cookie not defined..."});
    }

}