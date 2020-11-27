const Joi = require('joi');

const validateRequest = (req, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
  } else {
    req.body = value;
    next();
  }
};

module.exports = {
  login: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
  },
  signupCustomer: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      contact: Joi.string().required(),
    });
    validateRequest(req, next, schema);
  },
  signupEmployee: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      contact: Joi.string().required(),
      joined_on: Joi.string().min(10).required(),
    });
    validateRequest(req, next, schema);
  },
  createDepartment: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().default(null),
    });
    validateRequest(req, next, schema);
  },
  updateDepartment: (req, res, next) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string(),
      description: Joi.string(),
      is_active: Joi.string().valid('T', 'F'),
    });
    validateRequest(req, next, schema);
  },
  createProject: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().default(null),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      dept_id: Joi.number().required(),
    });
    validateRequest(req, next, schema);
  },
  updateProject: (req, res, next) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string(),
      description: Joi.string(),
      is_ongoing: Joi.string().valid('T', 'F'),
    });
    validateRequest(req, next, schema);
  },
  addMember: (req, res, next) => {
    const schema = Joi.object({
      project_id: Joi.number().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
    });
    validateRequest(req, next, schema);
  },
  updateMemberStatus: (req, res, next) => {
    const schema = Joi.object({
      project_id: Joi.number().required(),
      is_active: Joi.string().valid('T', 'F').required(),
    });
    validateRequest(req, next, schema);
  },
};
