import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    createdOn: Date;
    updatedOn: Date;
}

const LeadSchema = new Schema<ILead>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [100, "Name cannot be more than 100 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            maxlength: [100, "Email cannot be more than 100 characters"],
        },
        subject: {
            type: String,
            required: [true, "Subject is required"],
            trim: true,
            maxlength: [200, "Subject cannot be more than 200 characters"],
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
        },
    },
    {
        timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
        toJSON: {
            transform: function (_doc, ret: any) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

LeadSchema.index({ email: 1, createdOn: -1 });
LeadSchema.index({ subject: "text", message: "text", name: "text" });

export const LeadModel =
    mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
