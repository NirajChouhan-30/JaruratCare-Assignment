import mongoose from "mongoose";

const supportRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    supportNeeded: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    aiSummary: String,

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    category: String,

    recommendedAction: String,

     assignedVolunteer: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Volunteer",
},

status: {
  type: String,
  enum: [
    "Pending",
    "Assigned",
    "Completed",
  ],
  default: "Pending",
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "SupportRequest",
  supportRequestSchema
);