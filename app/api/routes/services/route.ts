import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ServiceModel } from '@/app/api/models/Service';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter: any = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    
    // Get total count
    const totalItems = await ServiceModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    
    // Get services with pagination
    const services = await ServiceModel.find(filter)
      .sort({ createdOn: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    return NextResponse.json({
      success: true,
      services,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
      },
    });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { title, description, image, price, category, status = 'active' } = body;
    
    // Validation
    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: 'Title and description are required' },
        { status: 400 }
      );
    }
    
    const now = new Date().toISOString();
    
    const service = new ServiceModel({
      title,
      description,
      image,
      price,
      category,
      status,
      createdOn: now,
      updatedOn: now,
    });
    
    const savedService = await service.save();
    
    return NextResponse.json({
      success: true,
      service: savedService,
      message: 'Service created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create service' },
      { status: 500 }
    );
  }
}

