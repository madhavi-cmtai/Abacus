import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ServiceModel } from '@/app/api/models/Service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const service = await ServiceModel.findById(params.id).lean();
    
    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      service,
    });
  } catch (error: any) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { title, description, image, price, category, status } = body;
    
    const updateData: any = { updatedOn: new Date().toISOString() };
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (price !== undefined) updateData.price = price;
    if (category !== undefined) updateData.category = category;
    if (status !== undefined) updateData.status = status;
    
    const service = await ServiceModel.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    ).lean();
    
    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      service,
      message: 'Service updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update service' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const service = await ServiceModel.findByIdAndDelete(params.id);
    
    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete service' },
      { status: 500 }
    );
  }
}

