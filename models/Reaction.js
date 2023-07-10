// Define Mongoose
const { Schema, Types } = require("mongoose");

// Define the Thought Schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: date,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// function to format the date string from the createdAt field using the date getter
function date(createdAt) {
  return createdAt.toDateString();
}

// Export the User model
module.exports = { reactionSchema };
