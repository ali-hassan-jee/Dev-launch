import { NextResponse } from 'next/server';

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
     if (!name && !email && !message ) {
      return NextResponse.json({ success: false, status: 400, error: 'Please fill all fields.' });
    }
    // Basic validation checks
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ success: false, status: 400, error: 'Invalid name provided.' });
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ success: false, status: 400, error: 'Invalid email address provided.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ success: false, status: 400, error: 'Message must be at least 10 characters long.' });
    }

    // If validation passes, log the values (or handle further, like sending to a database)
    console.log('Received:', { name, email, message });

    return NextResponse.json({ success: true, status: 201 });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error processing request:', error);
    return NextResponse.json({ success: false, status: 500, error: 'Internal server error.' });
  }
}