const { Happiness } = require("../models");

const createHappiness = async (data) => {
  const { intention_id, happiness, rating } = data;

  return await Happiness.create({
    intention_id,
    happiness,
    rating,
  });
};

const getHappinessByIntention = async (data) => {
  const { intentionId } = data;

  return await Happiness.findAll({
    where: { intention_id: intentionId },
    order: [["createdAt", "DESC"]],
  });
};

const updateHappiness = async (data) => {
  const { happinessId, happiness, rating } = data;

  const happinessRecord = await Happiness.findByPk(happinessId);
  if (!happinessRecord) throw new Error("Happiness record not found");

  happinessRecord.happiness = happiness;
  happinessRecord.rating = rating;

  await happinessRecord.save();
  return happinessRecord;
};

const deleteHappiness = async (data) => {
  const { happinessId } = data;

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
