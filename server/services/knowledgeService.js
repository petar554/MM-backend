const { Knowledge } = require("../models");

const createKnowledge = async (params, body) => {
  const { intentionId } = params;
  const { knowledge, rating } = body;

  return await Knowledge.create({
    intention_id: intentionId,
    knowledge: knowledge,
    rating: rating,
  });
};

const getKnowledgeByIntention = async (params, body) => {
  const { intentionId } = params;

  return await Knowledge.findAll({
    where: { intention_id: intentionId },
    order: [["createdAt", "DESC"]],
  });
};

const updateKnowledge = async (params, body) => {
  const { knowledgeId } = params;
  const { knowledge, rating } = body;

  const knowledgeRecord = await Knowledge.findByPk(knowledgeId);
  if (!knowledgeRecord) throw new Error("Knowledge record not found");

  knowledgeRecord.knowledge = knowledge;
  knowledgeRecord.rating = rating;

  await knowledgeRecord.save();
  return knowledgeRecord;
};

const deleteKnowledge = async (body) => {
  const { knowledgeId } = body;

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
