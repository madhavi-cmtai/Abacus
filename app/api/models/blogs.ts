import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    subtitle?: string;
    summary: string;
    image?: string;
    createdOn: Date;
    updatedOn: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [150, "Title cannot be more than 150 characters"],
        },
        subtitle: {
            type: String,
            trim: true,
            maxlength: [200, "Subtitle cannot be more than 200 characters"],
        },
        summary: {
            type: String,
            required: [true, "Summary is required"],
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
    },
    {
        // Automatically add createdOn & updatedOn
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

// Indexes for performance
BlogSchema.index({ title: "text", summary: "text", subtitle: "text" });
BlogSchema.index({ status: 1 });
BlogSchema.index({ createdOn: -1 });

export const BlogModel =
    mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
