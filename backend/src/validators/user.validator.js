const { body } = require('express-validator');

const userValidator = [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    body('role', 'Invalid role').optional().isIn(['admin', 'doctor', 'employee']),
];

module.exports = {
    userValidator,
};
