const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../services/authService");
const {
  handleValidationErrors,
  knowledgeValidationRules,
  idValidationRule,
} = require("../utils/validationRules");
const {
  createKnowledge,
  getKnowledgeByIntention,
  updateKnowledge,
  deleteKnowledge,
} = require("../services/knowledgeService");

router.post(
  "/create/:intentionId",
  verifyJWT,
  knowledgeValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const knowledge = await createKnowledge(req.params, req.body);
      res.status(201).json({ knowledge });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/:intentionId", verifyJWT, async (req, res) => {
  try {
    const knowledge = await getKnowledgeByIntention(req.params);
    res.status(200).json({ knowledge });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put(
  "/:knowledgeId",
  verifyJWT,
  knowledgeValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const knowledge = await updateKnowledge(req.params, req.body);
      res.status(200).json({ knowledge });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete("/:knowledgeId", verifyJWT, async (req, res) => {
  try {
    await deleteKnowledge(req.params);
    res.status(204).json({ message: "Knowledge deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
