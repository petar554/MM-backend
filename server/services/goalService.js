const { Goal } = require('../models');

const createGoal = async (params, body) => {
  const { intentionId } = params;
  const { goal, rating } = body;

  return await Goal.create({
    intention_id: intentionId,
    goal: goal,
    rating: rating,
  });
};

const getGoalsForIntention = async (params, body) => {
  const { intentionId } = params;

  return await Goal.findAll({
    where: { intention_id: intentionId },
    order: [["createdAt", "DESC"]],
  });
};

const updateGoal = async (params, body) => {
  const { goalId } = params;
  const { goal, rating } = body;

  const goalRecord = await Goal.findByPk(goalId);
  if (!goalRecord) throw new Error('Goal not found');
  
  goalRecord.goal = goal;
  goalRecord.rating = rating;

  await goalRecord.save();
  return goalRecord;
};

const deleteGoal = async (body) => {
  const { goalId } = body;

  const goalRecord = await Goal.findByPk(goalId);
  if (!goalRecord) throw new Error('Goal not found');
  
  await goalRecord.destroy();
};

module.exports = {
  createGoal,
  getGoalsForIntention,
  updateGoal,
  deleteGoal,
};
