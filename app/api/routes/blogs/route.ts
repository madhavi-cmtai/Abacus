import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogModel } from '@/app/api/models/blogs';

// Fetch all blogs with pagination and optional status filter
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); 

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    if (status) filter.status = status;

    // Get total count
    const totalItems = await BlogModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    // Get blogs with pagination
    const blogs = await BlogModel.find(filter)
      .sort({ createdOn: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
      },
    });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}


// Add a new blog
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { title, subtitle, summary, image } = body;

    // Validation
    if (!title || !summary) {
      return NextResponse.json(
        { success: false, message: 'Title and summary are required' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const blog = new BlogModel({
      title,
      subtitle,
      summary,
      image,
      createdOn: now,
      updatedOn: now,
    });

    const savedBlog = await blog.save();

    return NextResponse.json({
      success: true,
      blog: savedBlog,
      message: 'Blog created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
