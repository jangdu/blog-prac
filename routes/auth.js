const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "auth" });
});

router.post("/user", async (req, res, next) => {
  const { nickname, password, confirm } = req.body;
});

module.exports = router;
