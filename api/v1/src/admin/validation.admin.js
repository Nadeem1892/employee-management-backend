const Joi = require('joi');

// Common schema for fields used in both registration and login
const email = Joi.string()
  .trim()
  .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
  .required()
  .messages({
    'string.pattern.base': 'Please enter a valid email address',
    'string.empty': 'Email is required',
  });

const password = Joi.string()
  .trim()
  .min(4)
  .required()
  .messages({
    'string.min': 'Password must be at least 4 characters long',
    'string.empty': 'Password is required',
  });


// Login schema (unchanged)
const adminLoginSchema = Joi.object({
  email,
  password,
});

module.exports = {
    adminLoginSchema
};
