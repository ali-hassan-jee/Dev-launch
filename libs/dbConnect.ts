// lib/dbConnect.ts
import mongoose from 'mongoose';
declare global {
  var mongoose: {
    conn: any;
    promise: any;
  };
}
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/** 
 * Cached connection for MongoDB.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  
  if (cached.conn) {
    // console.log(cached.conn)
    return cached.conn;
  }
// console.log('MongoDB URI:', MONGODB_URI);
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;