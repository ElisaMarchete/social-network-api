const express = require("express");
const db = require("./config/connection");
const { User, Thought } = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get all users
app.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send({ message: "Something went wrong!" });
  }
});

// Get a single user by its _id  ** POPULATE (populated thought and friend data) **
app.get("/user/:id", async (req, res) => {
  // console.log(req.params.id);
  try {
    const singleUser = await User.findOne({ _id: req.params.id });

    res.status(200).json(singleUser);
  } catch (err) {
    res.status(500).send({ message: "Something went wrong!" });
  }
});

// Create a new user
app.post("/new-user", async (req, res) => {
  const newUser = new User(req.body);
  newUser.save();
  if (newUser) {
    res.status(200).json(newUser);
  } else {
    console.log("Something went wrong!");
    res.status(500).json({ message: "Something went wrong!" });
  }
});

// Delete a user by its _id
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).send({ message: "Something went wrong!" });
  }
});

// Update a user by its _id **Remove a user's associated thoughts when deleted.**
app.put("/update-user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).send({ message: "Something went wrong!" });
  }
});

// // Get all thoughts
// app.get("/all-thoughts", async (req, res) => {
//   try {
//     const users = await Thought.find({});
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).send({ message: "Something went wrong!" });
//   }
// });

// Start the express server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

// VIDEO 1:25
