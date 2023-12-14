import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/service/DB/helpers";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {id: number}}) {
    const jwtPayload = await getJWTPayload();
    const res = await sql('select * from posts where id = $1 and user_id = $2', [
        params.id, jwtPayload.sub
    ]);
    if(res.rowCount === 0){
        return NextResponse.json({error: "not found..."}, {status: 404});
    }
    return NextResponse.json({data: res.rows[0]});
};

export async function PATCH(request: Request, {params}: {params: {id: number}}) {
    const body = await request.json();
    const jwtPayload = await getJWTPayload();
    const currentTimestamp = new Date().toISOString();

    const res = await sql('select * from posts where id = $1 and user_id = $2', [
        params.id, jwtPayload.sub
    ]);
    if(res.rowCount === 0){
        return NextResponse.json({error: "not found..."}, {status: 404});
    }

    await sql('update posts set content = $1, updated_at = $2 where user_id = $3 and id = $4',[
        body.content,
        currentTimestamp,
        jwtPayload.sub,
        params.id
    ]);

    return NextResponse.json({msg: "update success."});

}

export async function DELETE(request: Request,  {params}: {params: {id: number}}) {

    const jwtPayload = await getJWTPayload();
    const res = await sql('delete from posts where user_id = $1 and id = $2',[
        jwtPayload.sub,
        params.id
    ])

    if(res.rowCount === 1){
        return NextResponse.json({msg: "deleted success."})
    }else{
        return NextResponse.json({error: "not found."}, {status: 404});
    }
}

export async function POST(request: Request) {
    const json = await request.json();
    const jwtPayload = await getJWTPayload();
    const content = json.content;
    const res = await sql('insert into posts (user_id, content) values ($1, $2) returning *'[
        jwtPayload.sub,
        content
    ]);

    return NextResponse.json({data: res.rows[0]}, {status: 401});
}