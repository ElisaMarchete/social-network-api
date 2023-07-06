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
      get: date,
    },
    //The user that created this thought
    username: {
      type: String,
      require: true,
    },
    // Array of nested reaction sub-documents
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// function to format the date string from the createdAt field using the date getter
function date(createdAt) {
  return createdAt.toDateString();
}

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create the User model using the User Schema
const Thought = model("Thought", thoughtSchema);

// Export the User model
module.exports = Thought;
