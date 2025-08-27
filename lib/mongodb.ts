import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Extend NodeJS global type to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Add MongoDB connection listeners only once
if (mongoose.connection.listeners("connected").length === 0) {
  mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected");
  });

  // Handle process termination
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed through app termination");
    process.exit(0);
  });
}

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    console.log("♻️ Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    };

    console.log("⏳ Connecting to MongoDB...");
    console.log(
      "🔑 MongoDB URI:",
      (MONGODB_URI ?? "").replace(/\/\/[^@]+@/, "//<credentials>@")
    );


    if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }

    cached.promise =
      mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log("🌍 New MongoDB connection established");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;

    // Verify database responds
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().ping();
      console.log("✅ MongoDB connection verified (ping success)");
    }

    return cached.conn;
  } catch (e: any) {
    cached.promise = null;
    console.error("🚨 MongoDB connection failed:", {
      name: e?.name || "Unknown error",
      message: e?.message || "No error message",
      code: e?.code,
      codeName: e?.codeName,
    });
    throw new Error("Failed to connect to MongoDB. See logs for details.");
  }
}
