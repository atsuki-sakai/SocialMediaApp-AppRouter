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

        try{
            const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
            await jwtVerify(cookie.value, secret);
        }catch(error) {
            console.error(error);
            return NextResponse.json({error: new MiddlewareError("unauthenticated")}, {status: 500});
        }
    }
}

export const config = {
    matcher: "/:path*",
}

