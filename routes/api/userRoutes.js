const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// http://localhost:3001/api/users
router.route("/").get(getAllUsers).post(createUser);

// http://localhost:3001/api/users/:userId
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
