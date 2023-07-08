const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.once("open", async () => {
  console.log("connected");
  await User.deleteMany({});
  await Thought.deleteMany({});

  const user = await User.insertMany([
    {
      username: "user1",
      email: "user1@gmail.com",
    },
    {
      username: "user2",
      email: "user2@gmail.com",
    },
  ]);
});
