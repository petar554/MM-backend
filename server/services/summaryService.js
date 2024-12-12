const { Summary } = require("../models");

const createSummary = async (data) => {
  const { intention_id, summary, rating, is_monthly_summary, highlight } = data;

  return await Summary.create({
    intention_id,
    summary,
    rating,
    is_monthly_summary,
    highlight,
  });
};

const getSummariesByIntention = async (data) => {
  const { intentionId } = data;

  return await Summary.findAll({
    where: { intention_id: intentionId },
    order: [["createdAt", "DESC"]],
  });
};

const updateSummary = async (data) => {
  const { summaryId, summary, rating, is_monthly_summary, highlight } = data;

  const summaryRecord = await Summary.findByPk(summaryId);
  if (!summaryRecord) throw new Error("Summary record not found");

  summaryRecord.summary = summary;
  summaryRecord.rating = rating;
  summaryRecord.is_monthly_summary = is_monthly_summary;
  summaryRecord.highlight = highlight;

  await summaryRecord.save();
  return summaryRecord;
};

const deleteSummary = async (data) => {
  const { summaryId } = data;

  const summaryRecord = await Summary.findByPk(summaryId);
  if (!summaryRecord) throw new Error("Summary record not found");

  await summaryRecord.destroy();
};

module.exports = {
  createSummary,
  getSummariesByIntention,
  updateSummary,
  deleteSummary,
};
