const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  // Get a single thought by id
  async getSingleThought(req, res) {
    try {
      const singleThought = await Thought.findOne({ _id: req.params.id });
      if (!singleThought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(singleThought);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  // Create a new thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json("You have created a thought 🎉");
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  // Update a thought by id
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
  // Delete a thought by id and remove from associated user
  async deleteThought(req, res) {
    console.log(req);
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });
      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.id },
        { $pull: { thoughts: req.params.id } },
        { new: true }
      );

      res.json(deletedThought);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
};
