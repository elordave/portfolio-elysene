import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get environment variables
    const apiKey = process.env.BREVO_API_KEY;
    const templateId = process.env.BREVO_TEMPLATE_ID;
    const adminEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@elysene.engineering';

    if (!apiKey || !templateId) {
      console.error('Missing Brevo configuration: BREVO_API_KEY or BREVO_TEMPLATE_ID');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Build Brevo API payload
    const payload = {
      templateId: Number(templateId),
      to: [
        { email: body.email, name: body.name }
      ],
      bcc: [
        { email: adminEmail, name: 'Ely Admin' }
      ],
      replyTo: {
        email: body.email,
        name: body.name
      },
      params: {
        NAME: body.name,
        COMPANY: body.company || 'Non renseigné',
        PHONE: body.phone || 'Non renseigné',
        MESSAGE: body.message
      }
    };

    // Send email via Brevo API
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json().catch(() => ({}));
      console.error('Brevo API error:', {
        status: brevoResponse.status,
        statusText: brevoResponse.statusText,
        error: errorData
      });
      return NextResponse.json(
        { error: 'Failed to send email', details: errorData },
        { status: 500 }
      );
    }

    await brevoResponse.json().catch(() => ({}));

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in send API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
