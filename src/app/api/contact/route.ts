import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.email || !data.message) {
      return NextResponse.json(
        { error: 'Email and message are required fields.' },
        { status: 400 }
      );
    }

    console.log('Received contact message from:', data.email, data.name);
    // Simulates database/email persistence
    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out to rPeptide. A technical specialist will contact you shortly.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process inquiry.' },
      { status: 500 }
    );
  }
}
