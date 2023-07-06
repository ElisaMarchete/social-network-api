// Define Mongoose
const { Schema, model } = require("mongoose");

// Define the User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Define the model using the User Schema
const User = model("User", userSchema);

// Export the User model
module.exports = User;

User.find({})
  .exec()
  .then(async (collection) => {
    if (collection.length === 0) {
      const results = await User.insertMany([
        { username: "user1", email: "email1@gmail.com" },
        { username: "user2", email: "email2@gmail.com" },
        { username: "user3", email: "email3@gmail.com" },
      ]);
      return console.log("Users inserted", results);
    }
    return console.log("Already populated");
  })
  .catch((err) => handleError(err));
