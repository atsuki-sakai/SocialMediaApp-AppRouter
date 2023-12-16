import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/service/DB/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {

    const jwtPayload = await getJWTPayload();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    // ログインユーザーをフォローしているユーザーを返す。
    const res = await sql('select * from follows where user_id = $1 and follower_id = $2',
        [userId, jwtPayload.sub]
    );

    return NextResponse.json({data: res.rows});
}

export async function POST(req: NextRequest) {

    const jwtPayload = await getJWTPayload();
    const json = await req.json();

    if(json.user_id == jwtPayload.sub) {
        return NextResponse.json({ error: "You cannot follow yourself." }, {status: 409})
    }
    
    // 既にフォロー済みか？
    const res = await sql('select * from follows where user_id = $1 and follower_id = $2',
        [json.user_id, jwtPayload.sub]
    );
    if (res.rowCount &&res.rowCount > 0){
        return NextResponse.json({ error: "already following." }, {status: 409});
    }

    // 未フォローであればフォローリストへ追加する。
    const res2 = await sql('insert into follows (user_id, follower_id) values ($1, $2)',
        [json.user_id, jwtPayload.sub]
    );

    return NextResponse.json({ msg: "follow success" });
}