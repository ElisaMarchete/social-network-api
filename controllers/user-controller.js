const { User, Thought } = require("../models");

// Get all users
module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  // Get a single user by its _id  ** POPULATE (populated thought and friend data) **
  async getSingleUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.id });
      if (!singleUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(singleUser);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  // Update a user by its _id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  // Delete a user by its _id
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
      if (!deletedUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(deletedUser);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
};

// app.get("/all-users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).send({ message: "Something went wrong!" });
//   }
// });

// Get a single user by its _id  ** POPULATE (populated thought and friend data) **
// app.get("/user/:id", async (req, res) => {
//   // console.log(req.params.id);
//   try {
//     const singleUser = await User.findOne({ _id: req.params.id });

//     res.status(200).json(singleUser);
//   } catch (err) {
//     res.status(500).send({ message: "Something went wrong!" });
//   }
// });

// Create a new user
// app.post("/new-user", async (req, res) => {
//   const newUser = new User(req.body);
//   newUser.save();
//   if (newUser) {
//     res.status(200).json(newUser);
//   } else {
//     console.log("Something went wrong!");
//     res.status(500).json({ message: "Something went wrong!" });
//   }
// });

// Delete a user by its _id **Remove a user's associated thoughts when deleted.**
// app.delete("/delete-user/:id", async (req, res) => {
//   try {
//     const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
//     res.status(200).json(deletedUser);
//   } catch (err) {
//     res.status(500).send({ message: "Something went wrong!" });
//   }
// });

// Update a user by its _id **Remove a user's associated thoughts when deleted.**
// app.put("/update-user/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).send({ message: "Something went wrong!" });
//   }
// });
