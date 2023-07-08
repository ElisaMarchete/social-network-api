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
  // Create a new thought **don't forget to push the created thought's _id to the associated user's thoughts array field**
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
      res.json(newThought);
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
  // Delete a thought by id
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });
      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(deletedThought);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  },
};
