import dbConnect from "@/libs/dbConnect";
import User from "@/libs/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const errors: Record<string, string> = {};

    if (!body.name || body.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!body.email || !body.email.includes("@") || !body.email.includes(".")) {
      errors.email = "Invalid email address";
    }

    if (!body.password || body.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!body.accountType || !["personal", "business"].includes(body.accountType)) {
      errors.accountType = "Invalid account type";
    }

    // If there are validation errors, return early
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, error: errors }, { status: 422 });
    }
    // database connection
     let dbConnection;
    try {
      dbConnection = await dbConnect();
      console.log("✅ Database connected successfully");
    } catch (dbError) {
      console.error("❌ Database connection failed:", dbError);
      return NextResponse.json(
        { 
          success: false, 
          error: "Database connection failed. Please try again later." 
        },
        { status: 503 }  // 503 Service Unavailable
      );
    }
    const existingUser = await User.findOne({ 
      email: body.email.toLowerCase().trim() 
    });
    
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          error: { email: "Email already registered" } 
        },
        { status: 409 }  // 409 Conflict
      );
    }
        const hashedPassword = await bcrypt.hash(body.password, 10);
const user = await User.create({
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      password: hashedPassword,  // Store the hash, not plain password
      phone: body.phone || "",
      country: body.country || "",
      accountType: body.accountType || "personal",
    });
      const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      country: user.country,
      accountType: user.accountType,
      createdAt: user.createdAt,
    };
    
   return NextResponse.json(
      { 
        success: true, 
        message: "Account created successfully!",
        data: userResponse 
      },
      { status: 201 }  // 201 Created
    );
    } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }
}