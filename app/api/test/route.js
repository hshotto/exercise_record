import { NextResponse } from "next/server";

export async function GET() {
    return Response.json({message:"Js로 만든 서버 응답"});
}

export async function POST() {
    return Response.json({message:"post라네"});
}