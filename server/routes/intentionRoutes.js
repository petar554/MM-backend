const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../services/authService');
const { createIntention, getIntentions, updateIntention, deleteIntention, } = require('../services/intentionService');
const { handleValidationErrors, intentionValidationRules, idValidationRule } = require('../utils/validationRules');

router.post(
    '/create',
    verifyJWT,
    intentionValidationRules(),
    handleValidationErrors,
    async (req, res) => {
        try {
            const intention = await createIntention(req.user.id.user_id, req.body);
            res.status(201).json({ intention });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

router.get('/', verifyJWT, async (req, res) => {
    try {
        const intentions = await getIntentions(req.user.id.user_id);
        res.status(200).json({ intentions });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put(
    '/:id',
    verifyJWT,
    [...idValidationRule(), ...intentionValidationRules()],
    handleValidationErrors,
    async (req, res) => {
        try {
            const intention = await updateIntention(req.params.id, req.user.id.user_id, req.body);
            res.status(200).json({ intention });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

router.delete(
    '/:id',
    verifyJWT,
    idValidationRule(),
    handleValidationErrors,
    async (req, res) => {
        try {
            await deleteIntention(req.params.id, req.user.id.user_id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

module.exports = router;
