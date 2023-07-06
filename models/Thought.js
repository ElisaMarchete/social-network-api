// Define Mongoose
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

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
    // Array of nested reaction sub-documents -> one-to-many relationship
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

// Define the model using the thought Schema
const Thought = model("Thought", thoughtSchema);

// Export the User model
module.exports = Thought;

// New document creation
// Thought.create({
//   thoughtText: "Here's a cool thought...",
//   username: "lernantino",
// })
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
