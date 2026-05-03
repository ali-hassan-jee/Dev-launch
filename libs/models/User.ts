import mongoose from "mongoose";

// ============================================
// SCHEMA DEFINITION (The Blueprint)
// ============================================
const userSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,  // No two users can have same email
      lowercase: true,  // Automatically convert to lowercase
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,  // Don't return password by default in queries
    },
    
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    
    country: {
      type: String,
      default: "",
    },
    
    accountType: {
      type: String,
      enum: ["personal", "business"],  // Only allow these values
      default: "personal",
    },
    
    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },
    
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    
    // Timestamps
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt
    toJSON: { 
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;  // Never send password in JSON response
        delete ret.__v;       // Remove version key
        return ret;
      }
    },
  }
);

// ============================================
// CREATE INDEXES (For faster queries)
// ============================================
userSchema.index({ email: 1 });  // Index on email for fast lookups
userSchema.index({ createdAt: -1 });  // Index on date for sorting

// ============================================
// CREATE MODEL (The Factory)
// ============================================
// Check if model already exists (for hot reloading in development)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;