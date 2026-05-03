import { NextResponse } from "next/server"
import Contact from "@/libs/models/Contact";
import dbConnect from "@/libs/dbConnect";
import { log } from "console";
function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // 🔥 IMPORTANT FIX

    console.log("ID received:", id);

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing ID in params" },
        { status: 400 }
      );
    }

    await dbConnect();

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}



export async function PUT(request: Request, { params }) {
 
    const {id} =await  params;
    const updatedRow=await request.json();
     // Basic validation checks
        console.log(updatedRow)
        if (!updatedRow.name || typeof updatedRow.name !== "string" || updatedRow.name.trim() === "") {
          return NextResponse.json({
            success: false,
            status: 400,
            error: "Invalid name provided.",
          });
        }
    
        if (!updatedRow.email || typeof updatedRow.email !== "string" || !isValidEmail(updatedRow.email)) {
          return NextResponse.json({
            success: false,
            status: 400,
            error: "Invalid email address provided.",
          });
        }
    
        if (!updatedRow.message || typeof updatedRow.message !== "string" || updatedRow.message.trim().length < 10) {
          return NextResponse.json({
            success: false,
            status: 400,
            error: "Message must be at least 10 characters long.",
          });
        }
    try{
          await dbConnect(); 
const { name, email, message } = updatedRow;
 const updatedContact = await Contact.findByIdAndUpdate(id, { name, email, message }, { new: true });

if (!updatedContact) {
  return NextResponse.json(
    { success: false, error: "Contact not found" },
    { status: 404 }
  );
}
return NextResponse.json(
      {message: 'Contact updated successfully',success:true,data: updatedContact },
      { status: 200 },
      
    ); 
    
} catch (error) {
  const message =
    error instanceof Error ? error.message : "Unknown error";

  return NextResponse.json(
    { success: false, error: message },
    { status: 500 }
  );
}
  
}
