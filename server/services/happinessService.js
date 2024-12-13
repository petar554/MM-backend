const { Happiness } = require("../models");

const createHappiness = async (params, body) => {
  const { intentionId } = params;
  const { happiness, rating } = body;

  return await Happiness.create({
    intention_id: intentionId,
    happiness: happiness,
    rating: rating,
  });
};

const getHappinessByIntention = async (params, body) => {
  const { intentionId } = params;

  return await Happiness.findAll({
    where: { intention_id: intentionId },
    order: [["createdAt", "DESC"]],
  });
};

const updateHappiness = async (params, body) => {
  const { happinessId } = params;
  const { happiness, rating } = body;

  const happinessRecord = await Happiness.findByPk(happinessId);
  if (!happinessRecord) throw new Error("Happiness record not found");

  happinessRecord.happiness = happiness;
  happinessRecord.rating = rating;

  await happinessRecord.save();
  return happinessRecord;
};

const deleteHappiness = async (body) => {
  const { happinessId } = body;

  const happinessRecord = await Happiness.findByPk(happinessId);
  if (!happinessRecord) throw new Error("Happiness record not found");
  
  await happinessRecord.destroy();
};

module.exports = {
  createHappiness,
  getHappinessByIntention,
  updateHappiness,
  deleteHappiness,
};
