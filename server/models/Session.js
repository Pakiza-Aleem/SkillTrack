import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      trim: true
    },

    topic: {
      type: String,
      required: true,
      enum: ["React", "Node", "Database", "Other"]
    },

    hours: {
      type: Number,
      required: true,
      min: 1,
      max: 24
    },

    notes: {
      type: String,
      default: ""
    },

    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;