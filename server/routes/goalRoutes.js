const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoalsForIntention,
  updateGoal,
  deleteGoal,
} = require("../services/goalService");
const { verifyJWT } = require("../services/authService");
const {
  handleValidationErrors,
  goalValidationRules,
} = require("../utils/validationRules");

// create Goal for a specific intention
router.post(
  "/create/:intentionId",
  verifyJWT,
  goalValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const newGoal = await createGoal(req.params, req.body);
      res.status(201).json({ goal: newGoal });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// get all Goals for a specific intention
router.get("/:intentionId", verifyJWT, async (req, res) => {
  try {
    const goals = await getGoalsForIntention(req.params);
    res.status(200).json({ goals });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update Goal by goal_id
router.put(
  "/:goalId",
  verifyJWT,
  goalValidationRules(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const updatedGoal = await updateGoal(req.body);
      res.status(200).json({ goal: updatedGoal });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// delete Goal by goal_id
router.delete("/:goalId", verifyJWT, async (req, res) => {
  try {
    await deleteGoal(req.params);
    res.status(204).json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
