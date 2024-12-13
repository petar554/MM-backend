const { Summary } = require("../models");

const createSummary = async (params, body) => {
  const { intentionId } = params;
  const { summary, is_monthly_summary, highlight } = body;

  return await Summary.create({
    intention_id: intentionId,
    summary: summary,
    is_monthly_summary: is_monthly_summary,
    highlight:  highlight,
  });
};

const getSummariesByIntention = async (params, body) => {
  const { intentionId } = params;

  return await Summary.findAll({
    where: { intention_id: intentionId },
    order: [["createdAt", "DESC"]],
  });
};

const updateSummary = async (params, body) => {
  const { summaryId } = params;
  const { summary, is_monthly_summary, highlight } = body;

  const summaryRecord = await Summary.findByPk(summaryId);
  if (!summaryRecord) throw new Error("Summary record not found");

  summaryRecord.summary = summary;
  summaryRecord.is_monthly_summary = is_monthly_summary;
  summaryRecord.highlight = highlight;

  await summaryRecord.save();
  return summaryRecord;
};

const deleteSummary = async (body) => {
  const { summaryId } = body;

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
