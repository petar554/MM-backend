const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../services/authService");
const {
  handleValidationErrors,
  happinessValidationRules,
  idValidationRule,
} = require("../utils/validationRules");
const {
  createHappiness,
  getHappinessByIntention,
  updateHappiness,
  deleteHappiness,
} = require("../services/happinessService");

// route to create a new Happiness record
router.post(
  "/create",
  verifyJWT,
  happinessValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const happiness = await createHappiness(req.body);
      res.status(201).json({ happiness });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// route to get all Happiness records for a specific intention
router.get("/:intentionId", verifyJWT, async (req, res) => {
  try {
    const happiness = await getHappinessByIntention(req.params);
    res.status(200).json({ happiness });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// route to update a Happiness record
router.put(
  "/:happinessId",
  verifyJWT,
  happinessValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const happiness = await updateHappiness(req.body);
      res.status(200).json({ happiness });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// route to delete a Happiness record
router.delete("/:happinessId", verifyJWT, async (req, res) => {
  try {
    await deleteHappiness(req.params);
    res.status(204).json({ message: "Happiness deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
