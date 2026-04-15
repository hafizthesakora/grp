import mongoose from "mongoose";

// Cached connection for hot-reload in dev
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

const cache = global._mongooseCache ?? (global._mongooseCache = { conn: null, promise: null });

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { bufferCommands: false }).then((m) => m);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
