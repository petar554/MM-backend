const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  uploadMedia,
  getMediaForIntention,
} = require("../services/mediaService");
const { verifyJWT } = require("../services/authService");
const {
  handleValidationErrors,
  mediaValidationRules,
} = require("../utils/validationRules");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create/:intentionId",
  verifyJWT,
  upload.single("media"),
  mediaValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const media = await uploadMedia(
        req.file,
        req.params.intentionId,
        req.file.mimetype
      );
      res.status(201).json({ media });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/:intentionId", verifyJWT, async (req, res) => {
  try {
    const media = await getMediaForIntention(req.params.intentionId);
    res.status(200).json({ media });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
