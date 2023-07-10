const { User, Thought } = require("../models");

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
  // Get a single user by id
  async getSingleUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.id })
        .populate("thoughts")
        .populate("friends");

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
  // Update a user by id
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
  // Delete a user by id **Remove a user's associated thoughts when deleted.**
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
      if (!deletedUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      const deletedThoughts = await Thought.deleteMany({
        _id: { $in: deletedUser.thoughts },
      });
      res.json(deletedUser);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
};
