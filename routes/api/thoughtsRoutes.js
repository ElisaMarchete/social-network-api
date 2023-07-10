const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller");

// http://localhost:3001/api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// http://localhost:3001/api/thoughts/:id
router
  .route("/:id")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// http://localhost:3001/api/thoughts/:id/reactions
router.route("/:id/reactions").post(addReaction);

// http://localhost:3001/api/thoughts/:id/reactions
router.route("/:id/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
