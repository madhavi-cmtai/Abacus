import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { FAQModel } from "../../../models/faq";

// Connect to MongoDB if not already connected
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGODB_URI || "", {
    dbName: process.env.MONGODB_DB || undefined,
  });
}

// GET /api/routes/faq/[id] - Get FAQ by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid FAQ ID" }, { status: 400 });
    }
    const faq = await FAQModel.findById(id);
    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }
    return NextResponse.json(faq, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch FAQ" },
      { status: 500 }
    );
  }
}

// PUT /api/routes/faq/[id] - Update FAQ by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid FAQ ID" }, { status: 400 });
    }
    const body = await req.json();
    const { question, answer, category } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const updatedFAQ = await FAQModel.findByIdAndUpdate(
      id,
      { question, answer, category },
      { new: true, runValidators: true }
    );

    if (!updatedFAQ) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(updatedFAQ, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

// DELETE /api/routes/faq/[id] - Delete FAQ by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid FAQ ID" }, { status: 400 });
    }
    const deletedFAQ = await FAQModel.findByIdAndDelete(id);
    if (!deletedFAQ) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "FAQ deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
