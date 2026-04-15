import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnect";
import Contact from "@/libs/models/Contact";
// Utility function for email validation
function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

export async function POST(request: Request) {
  //  for(let i=0;i<=1000000000;i++){

  //  }
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        status: 400,
        error: "Please fill all fields.",
      });
    }
    // Basic validation checks
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({
        success: false,
        status: 400,
        error: "Invalid name provided.",
      });
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        status: 400,
        error: "Invalid email address provided.",
      });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({
        success: false,
        status: 400,
        error: "Message must be at least 10 characters long.",
      });
    }

    // If validation passes, log the values (or handle further, like sending to a database)
    console.log("Received:", { name, email, message });
    // Connect to database
    try {
      await dbConnect();
      // console.log(' Database connected successfully');
    } catch (dbError) {
      // console.error(' Database connection failed:', dbError);
      return NextResponse.json(
        { success: false, error: "Database connection failed" },
        { status: 500 },
      );
    }

    // Create new contact entry
    try {
      console.log(Contact);
      const contact = await Contact.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        message: message.trim(),
      });
      // console.log('✅ Data saved successfully:', contact._id);
      // console.log('📦 Saved data:', { name, email, message });

      return NextResponse.json(
        {
          success: true,
          message: "Data saved successfully!",
          data: contact,
        },
        { status: 201 },
      );
    } catch (saveError) {
      console.error("❌ Error saving to database:", saveError);
      return NextResponse.json(
        { success: false, error: "Failed to save data: " + saveError.message },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("❌ Unexpected error in API route:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error: " + error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  // console.log('get request.....');
  try {
    await dbConnect();
    const data = await Contact.find()
      .select("name email message createdAt")
      .sort({ createdAt: -1 }); // console.log('data is',data);
    return NextResponse.json({
  success: true,
  data,
  count: data.length
}, { status: 200 });
  } catch (error) {
    // Step 4: If anything fails, return error
    console.error("GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch contacts: " + error.message,
      },
      { status: 500 },
    );
  }
}
