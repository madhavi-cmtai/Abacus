import { NextRequest, NextResponse } from "next/server";
import { LeadModel } from "@/app/api/models/leads";

// GET /api/routes/leads/[id] - Get a lead by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const lead = await LeadModel.findById(id).lean();
    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(lead, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { error: "Failed to fetch lead" },
      { status: 500 }
    );
  }
}

// PUT /api/routes/leads/[id] - Update a lead by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedLead = await LeadModel.findByIdAndUpdate(
      id,
      { name, email, subject, message },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedLead.toJSON(), { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

// DELETE /api/routes/leads/[id] - Delete a lead by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deletedLead = await LeadModel.findByIdAndDelete(id);

    if (!deletedLead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Lead deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}