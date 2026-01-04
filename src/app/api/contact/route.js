import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, fromDate, toDate, adults, children, message } = await request.json();
    
    if (!name || !email || !phone) {
      return NextResponse.json({ 
        success: false, 
        message: 'Name, email, and phone are required' 
      }, { status: 400 });
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: 'New Booking Inquiry - Vizag Tours',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">New Booking Inquiry</h2>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f2937;">Contact Details:</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
              </div>

              ${fromDate || toDate ? `
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f2937;">Travel Details:</h3>
                ${fromDate ? `<p><strong>From Date:</strong> ${fromDate}</p>` : ''}
                ${toDate ? `<p><strong>To Date:</strong> ${toDate}</p>` : ''}
                ${adults ? `<p><strong>Adults:</strong> ${adults}</p>` : ''}
                ${children ? `<p><strong>Children:</strong> ${children}</p>` : ''}
              </div>
              ` : ''}

              ${message ? `
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f2937;">Message:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              ` : ''}

              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                This inquiry was submitted from Vizag Araku Tourism website.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    }, { status: 500 });
  }
}
