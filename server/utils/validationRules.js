const { body, param, validationResult } = require('express-validator');

// middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// validation rules for user autehntication
const registerValidationRules = () => [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address.'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 6 characters long.'),
    body('first_name')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string.'),
    body('last_name')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string.'),
    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string.'),
    body('date_of_birth')
        .notEmpty().withMessage('Date of birth is required')
        .isDate().withMessage('Date of birth must be a valid date.'),
    body('city')
        .notEmpty().withMessage('City is required')
        .isString().withMessage('City must be a string.'),
    body('country')
        .notEmpty().withMessage('Country is required')
        .isString().withMessage('Country must be a string.')
];

const loginValidationRules = () => [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address.'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string.')
];

const googleLoginValidationRules = () => [
    body('idToken')
        .notEmpty().withMessage('Google ID token is required')
];

// validation rules for intention fields
const intentionValidationRules = () => [
    body('total_rating')
        .notEmpty().withMessage('Total rating is required')
        .isNumeric().withMessage('Total rating must be a number'),
];

// validation rules for Goals
const goalValidationRules = () => [
    body('goal')
        .notEmpty().withMessage('Goal is required')
        .isString().withMessage('Goal must be a string.'),
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isNumeric().withMessage('Rating must be a number.'),
];

// validation rules for Happiness
const happinessValidationRules = () => [
    body('happiness')
        .notEmpty().withMessage('Happiness is required')
        .isString().withMessage('Happiness must be a string.'),
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isNumeric().withMessage('Rating must be a number.'),
];

// validation rules for Knowledge
const knowledgeValidationRules = () => [
    body('knowledge')
        .notEmpty().withMessage('Knowledge is required')
        .isString().withMessage('Knowledge must be a string.'),
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isNumeric().withMessage('Rating must be a number.'),
];

// validation rules for Summaries
const summaryValidationRules = () => [
    body('summary')
        .notEmpty().withMessage('Summary is required')
        .isString().withMessage('Summary must be a string.'),
    body('is_monthly_summary')
        .notEmpty().withMessage('Is monthly summary is required')
        .isBoolean().withMessage('Is monthly summary must be a boolean.'),
    body('highlight')
        .optional()
        .isString().withMessage('Highlight must be a string.'),
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isNumeric().withMessage('Rating must be a number.'),
];


// validation rules for media uploads
const mediaValidationRules = () => [
    body('media_url')
        .optional()
        .isURL().withMessage('media_url must be a valid URL'),
    body('media_type')
        .optional()
        .isString().withMessage('media_type must be a string'),
];

const idValidationRule = () => [
    param('id')
    .notEmpty().withMessage('Intention ID is required')
    .isUUID().withMessage('Intention ID must be a valid UUID'),
];

module.exports = {
    handleValidationErrors,
    registerValidationRules,
    loginValidationRules,
    googleLoginValidationRules,
    intentionValidationRules,
    goalValidationRules,
    happinessValidationRules,
    knowledgeValidationRules,
    summaryValidationRules,
    mediaValidationRules,
    idValidationRule,
};
