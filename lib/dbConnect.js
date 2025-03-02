// lib/dbConnect.js

import mongoose from 'mongoose';

let isConnected = false;

export async function dbConnect() {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // these options may differ by Mongoose version
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
}
