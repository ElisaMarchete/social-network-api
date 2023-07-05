// Define Mongoose
const { Schema, model } = require("mongoose");

// Define the Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      require: true,
    }, //The user that created this thought
    reactions: [reactionSchema], // Array of nested reaction sub-documents
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create the User model using the User Schema
const Thought = model("Thought", thoughtSchema);

// Export the User model
module.exports = Thought;
