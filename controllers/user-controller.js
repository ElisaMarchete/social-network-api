const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({}).select("-__v");
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
  // Delete a user by id and associated thoughts
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
      if (!deletedUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      await Thought.deleteMany({
        _id: { $in: deletedUser.thoughts },
      });
      res.json(deletedUser);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },

  // Add a new friend
  async addFriend(req, res) {
    const userId = req.params.id;
    const friendId = req.params.friendId;
    const user = await User.findById(userId);

    if (userId === friendId) {
      return res
        .status(400)
        .json({ message: "You cannot add yourself as a friend." });
    }

    if (!user) {
      return res.status(404).json({ message: "No user with this id!" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Friend already added." });
    }
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { friends: req.params.friendId } }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },

  // Delete a friend
  async deleteFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json({ message: "Friend deleted!" });
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
};
