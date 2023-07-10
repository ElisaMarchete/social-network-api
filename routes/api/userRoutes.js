const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  // addFriend,
  // deleteFriend,
} = require("../../controllers/user-controller");

// http://localhost:3001/api/users
router.route("/").get(getAllUsers).post(createUser);

// http://localhost:3001/api/users/:id
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// http://localhost:3001/api/users/:userId/friends
// router.route("/:id/friends").post(addFriend);

// http://localhost:3001/api/users/:userId/friends/:friendId
// router.route("/:id/friends/:friendId").delete(deleteFriend);

module.exports = router;
