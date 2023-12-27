import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

class MiddlewareError extends Error {
    private _message = "";
    constructor(message = "") {
        super(message);  
        this.name = "MiddlewareError";  
        this._message = message;      
    }

    get message() {
        return this._message;
    }

    toString() {
        return `${this.name}: ${this._message}`;
    }
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const authenticatedAPIRoutes = [
        pathname.startsWith("/api/users"),
        pathname.startsWith("/api/posts")
    ];

    if(authenticatedAPIRoutes.includes(true)) {
        const cookie = request.cookies.get('jwt-token');

        if(!cookie || !cookie?.value) {
            return NextResponse.json({error: new MiddlewareError("not found jwt-token.")}, {status: 401});
        }

        try {
            // JWTシークレットを確認します。未定義の場合や長さが不足している場合はエラーを投げます。
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) { // 32は最小推奨長さです
                throw new MiddlewareError("JWT secret is either undefined.");
            }

            if (jwtSecret.length < 32) { // 32は最小推奨長さです
                throw new MiddlewareError("JWT secret is too short.");
            }
        
            // JWTシークレットをエンコードします。
            const secret = new TextEncoder().encode(jwtSecret);
        
            // jwtVerify 関数を使用してトークンを検証します。
            await jwtVerify(cookie.value, secret);
        
        } catch (error: any) {
            console.error(error);
            
            // エラーメッセージが存在する場合はそのメッセージを、存在しない場合は"unauthenticated"を返します。
            return NextResponse.json({ error: new MiddlewareError(error.message ? error.message : "unauthenticated") }, { status: 401 }); // ステータスコードを401に設定
        }
        
        // try{
        //     const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        //     await jwtVerify(cookie.value, secret);
        // }catch(error: any) {
        //     console.error(error);
        //     return NextResponse.json({error: new MiddlewareError(error.message ? error.message : "unauthenticated")}, {status: 500});
        // }
    }
}

export const config = {
    matcher: "/:path*",
}

