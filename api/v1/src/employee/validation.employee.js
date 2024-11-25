const Joi = require('joi');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


// Define the Joi validation schema for employee data
const employeeValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Name should be a string.',
    'string.min': 'Name should have at least 3 characters.',
    'string.max': 'Name should have at most 100 characters.',
    'string.empty': 'Name is required.'
  }),
  
  email: Joi.string()
    .pattern(emailRegex) // Use the custom regex pattern
    .required()
    .messages({
      'string.base': 'Email should be a string.',
      'string.pattern.base': 'Invalid email format.', // Custom error message for regex mismatch
      'string.empty': 'Email is required.',
    }),

  mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
    'string.base': 'Mobile number should be a string.',
    'string.length': 'Mobile number should be exactly 10 digits.',
    'string.pattern.base': 'Mobile number should only contain digits.',
    'string.empty': 'Mobile number is required.'
  }),

  designation: Joi.string().required().messages({
    'string.base': 'Designation should be a string.',
    'string.empty': 'Designation is required.'
  }),

  gender: Joi.string().valid('Male', 'Female').required().messages({
    'string.base': 'Gender should be a string.',
    'any.only': 'Gender must be either Male or Female.',
    'string.empty': 'Gender is required.'
  }),

  course: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Course should be a string.',
    'string.min': 'Course should have at least 3 characters.',
    'string.max': 'Course should have at most 100 characters.',
    'string.empty': 'Course is required.'
  }),

  image: Joi.any().optional(),
});

module.exports = {
  employeeValidationSchema
};
