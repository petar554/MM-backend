const { Intention } = require('../models');

const createIntention = async (userId, data) => {
    const { total_rating } = data;
    return await Intention.create({
        user_id: userId,
        total_rating,
    });
};

const getIntentions = async (userId) => {
    return await Intention.findAll({
        where: { user_id: userId },
        order: [['createdAt', 'DESC']],
    });
};

const updateIntention = async (id, userId, data) => {
    const intention = await Intention.findOne({ where: { intention_id: id, user_id: userId } });
    if (!intention) throw new Error('Intention not found');
    return await intention.update(data);
};

const deleteIntention = async (id, userId) => {
    const intention = await Intention.findOne({ where: { intention_id: id, user_id: userId } });
    if (!intention) throw new Error('Intention not found');
    return await intention.destroy();
};

module.exports = { createIntention, getIntentions, updateIntention, deleteIntention };
