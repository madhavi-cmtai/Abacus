import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogModel } from '@/app/api/models/blogs';

// Get blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    const blog = await BlogModel.findById(id).lean();
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error('Error fetching blog by id:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// Update blog by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await request.json();

    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.subtitle !== undefined) updateData.subtitle = body.subtitle;
    if (body.summary !== undefined) updateData.summary = body.summary;
    if (body.image !== undefined) updateData.image = body.image;
    updateData.updatedOn = new Date().toISOString();

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog: updatedBlog,
      message: 'Blog updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// Delete blog by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    const deletedBlog = await BlogModel.findByIdAndDelete(id).lean();
    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
      blog: deletedBlog,
    });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
