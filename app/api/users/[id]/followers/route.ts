import { sql } from "@/service/DB/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {

    const { searchParams } = new URL(req.url)
    const page = ( searchParams.get('page') && parseInt(searchParams.get('page')!) || 0)
    const limit = 3;
    const offset = page * limit;
    const id = params.id;
    const res = await sql(
        `select u.id, u.username, u.avatar from users u inner join follows f on u.id = f.follower_id where user_id = $1 limit $2 offset $3`,
        [id, limit, offset]
    )

    return NextResponse.json({data: res.rows});

}