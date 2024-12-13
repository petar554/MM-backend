const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../services/authService");
const {
  handleValidationErrors,
  summaryValidationRules,
  idValidationRule,
} = require("../utils/validationRules");
const {
  createSummary,
  getSummariesByIntention,
  updateSummary,
  deleteSummary,
} = require("../services/summaryService");

router.post(
  "/create/:intentionId",
  verifyJWT,
  summaryValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const summary = await createSummary(req.params, req.body);
      res.status(201).json({ summary });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/:intentionId", verifyJWT, async (req, res) => {
  try {
    const summaries = await getSummariesByIntention(req.params);
    res.status(200).json({ summaries });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put(
  "/:summaryId",
  verifyJWT,
  summaryValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const summary = await updateSummary(req.params, req.body);
      res.status(200).json({ summary });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete("/:summaryId", verifyJWT, async (req, res) => {
  try {
    await deleteSummary(req.params);
    res.status(204).json({ message: "Summary deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
