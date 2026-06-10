const express =
require("express");

const router =
express.Router();

const protect =
require(
"../middleware/authMiddleware"
);

const {

  createMessage,
  getMessages,
  deleteMessage

} = require(
"../controllers/contactController"
);

router.post(
  "/",
  createMessage
);

router.get(
  "/",
  protect,
  getMessages
);

router.delete(
  "/:id",
  protect,
  deleteMessage
);

module.exports =
router;