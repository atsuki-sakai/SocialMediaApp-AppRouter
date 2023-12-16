import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/service/DB/helpers";
import { jwtDecrypt } from "jose";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest, {params}: {params: {user_id: string}}) {

    const jwtPayload = await getJWTPayload();
    const user_id = params.user_id;

    await sql('delete from follows where user_id = $1 and follower_id = $2',
        [user_id, jwtPayload.sub]
    )

    return NextResponse.json({msg: "follow deleted."}, {status: 200});
}