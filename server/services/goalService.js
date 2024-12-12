const { Goal } = require('../models');

const createGoal = async (data) => {
  const { intentionId, goal, rating } = data;

  return await Goal.create({
    intention_id: intentionId,
    goal: goal,
    rating: rating,
  });
};

const getGoalsForIntention = async (data) => {
  const { intentionId } = data;

  return await Goal.findAll({
    where: { intention_id: intentionId },
    order: [["createdAt", "DESC"]],
  });
};

const updateGoal = async (data) => {
  const { goalId, goal, rating } = data;

  const goalRecord = await Goal.findByPk(goalId);
  if (!goalRecord) throw new Error('Goal not found');
  
  goalRecord.goal = goal;
  goalRecord.rating = rating;

  await goalRecord.save();
  return goalRecord;
};

const deleteGoal = async (data) => {
  const { goalId } = data;

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
