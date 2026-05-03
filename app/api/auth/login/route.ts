import dbConnect from "@/libs/dbConnect";
import User from "@/libs/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signToken } from "@/libs/jwt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }
    await dbConnect();
    const user = await User.findOne({ email }).select(
      "name email phone +password",
    );

    
    if (!user) {
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        { status: 401 },
        // console.log("user not found issue")
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return NextResponse.json(
        { message: "Wrong Password" },
        { status: 401 },
        // console.log("password issue")
      );
    }console.log(user)
   const token = signToken({
  userId: user._id.toString(),
  email: user.email,
});
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

response.cookies.set("token", token, {
  httpOnly: true,
  secure: false, // important for dev
  sameSite: "lax",
  path: "/",
});
    return response;
  
  } catch (error) {
    console.error("LOGIN API ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }

}
