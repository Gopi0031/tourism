import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Package from '@/models/Package';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Validate required fields
    if (!data.packageId || !data.name || !data.email || !data.phone || !data.travelers || !data.travelDate) {
      return NextResponse.json({ 
        success: false, 
        message: 'All fields are required' 
      }, { status: 400 });
    }
    
    const booking = await Booking.create(data);
    const packageData = await Package.findById(data.packageId);
    
    if (!packageData) {
      return NextResponse.json({ 
        success: false, 
        message: 'Package not found' 
      }, { status: 404 });
    }

    // Send email only if credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: data.email,
          subject: `Booking Confirmation - ${packageData.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Thank you for your booking!</h2>
              <p>Dear ${data.name},</p>
              <p>Your booking for <strong>${packageData.title}</strong> has been received.</p>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Booking Details:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li><strong>Package:</strong> ${packageData.title}</li>
                  <li><strong>Number of Travelers:</strong> ${data.travelers}</li>
                  <li><strong>Travel Date:</strong> ${new Date(data.travelDate).toLocaleDateString()}</li>
                  <li><strong>Price:</strong> ₹${packageData.price}</li>
                  <li><strong>Total Amount:</strong> ₹${packageData.price * data.travelers}</li>
                </ul>
              </div>
              <p>We will contact you shortly at ${data.phone} to confirm your booking.</p>
              <p style="color: #6b7280; font-size: 14px;">For any queries, contact us at +91-8977911599</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the booking if email fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: booking,
      message: 'Booking successful! We will contact you soon.' 
    }, { status: 201 });
  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to create booking' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find({}).populate('packageId').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error('GET Bookings Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to fetch bookings',
      data: []
    }, { status: 500 });
  }
}
