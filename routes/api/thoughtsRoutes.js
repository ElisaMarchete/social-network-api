const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughts-controller");

// http://localhost:3001/api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// http://localhost:3001/api/thoughts/:id
router
  .route("/:id")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
