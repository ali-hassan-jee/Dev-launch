import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const SECRET=process.env.JWT_SECRET;

export async function GET(){
    const cookiesStore=await cookies();
    const token=cookiesStore.get("token")?.value;
    if (!token){
        return NextResponse.json({user:null})
    }
      try {
    const user = jwt.verify(token, SECRET);

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
