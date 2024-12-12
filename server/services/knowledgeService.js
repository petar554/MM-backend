const { Knowledge } = require("../models");

const createKnowledge = async (data) => {
  const { intention_id, knowledge, rating } = data;

  return await Knowledge.create({
    intention_id,
    knowledge,
    rating,
  });
};

const getKnowledgeByIntention = async (data) => {
  const { intentionId } = data;

  return await Knowledge.findAll({
    where: { intention_id: intentionId },
    order: [["createdAt", "DESC"]],
  });
};

const updateKnowledge = async (data) => {
  const { knowledgeId, knowledge, rating } = data;

  const knowledgeRecord = await Knowledge.findByPk(knowledgeId);
  if (!knowledgeRecord) throw new Error("Knowledge record not found");

  knowledgeRecord.knowledge = knowledge;
  knowledgeRecord.rating = rating;

  await knowledgeRecord.save();
  return knowledgeRecord;
};

const deleteKnowledge = async (data) => {
  const { knowledgeId } = data;

  const knowledgeRecord = await Knowledge.findByPk(knowledgeId);
  if (!knowledgeRecord) throw new Error("Knowledge record not found");

  await knowledgeRecord.destroy();
};

module.exports = {
  createKnowledge,
  getKnowledgeByIntention,
  updateKnowledge,
  deleteKnowledge,
};
