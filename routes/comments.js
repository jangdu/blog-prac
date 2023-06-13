const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ data: "comments" });
});

module.exports = router;
