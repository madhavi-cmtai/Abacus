import { NextRequest, NextResponse } from "next/server";
import { LeadModel } from "../../models/leads";

// GET /api/routes/leads - Get all leads
export async function GET() {
  try {
    const leads = await LeadModel.find().sort({ createdOn: -1 }).lean();
    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
      console.error("error", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

// POST /api/routes/leads - Create a new lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const lead = await LeadModel.create({ name, email, subject, message });
    return NextResponse.json(lead.toJSON(), { status: 201 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
