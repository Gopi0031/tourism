import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Package from '@/models/Package';

export async function GET() {
  try {
    await connectDB();
    const packages = await Package.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    console.error('GET Packages Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to fetch packages',
      data: [] 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.price) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields' 
      }, { status: 400 });
    }
    
    const tourPackage = await Package.create(data);
    return NextResponse.json({ success: true, data: tourPackage }, { status: 201 });
  } catch (error) {
    console.error('POST Package Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to create package' 
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const { id, ...data } = await request.json();
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        message: 'Package ID is required' 
      }, { status: 400 });
    }
    
    const tourPackage = await Package.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    
    if (!tourPackage) {
      return NextResponse.json({ 
        success: false, 
        message: 'Package not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: tourPackage });
  } catch (error) {
    console.error('PUT Package Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to update package' 
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        message: 'Package ID is required' 
      }, { status: 400 });
    }
    
    const deletedPackage = await Package.findByIdAndDelete(id);
    
    if (!deletedPackage) {
      return NextResponse.json({ 
        success: false, 
        message: 'Package not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    console.error('DELETE Package Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to delete package' 
    }, { status: 500 });
  }
}
