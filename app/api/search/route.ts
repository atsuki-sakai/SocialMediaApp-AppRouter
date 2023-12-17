import { sql } from "@/service/DB/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q');

    if(!search){
        return NextResponse.json({error: "search parmas required."}, {status: 400});
    }

    // ["%" + search + "%"]は指定文字列を含むテーブルのデータを返す。 Tia => Tianna31 を返す。
    const res = await sql(
        "select id, username, avatar from users where username ilike $1 limit 10",
        ["%" + search + "%"]
    );
    return NextResponse.json({data: res.rows});
}