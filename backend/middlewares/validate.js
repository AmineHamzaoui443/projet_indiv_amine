const Joi = require('joi');

const articleSchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().max(2000).required(),
  owner: Joi.object({
    name: Joi.string().max(100).allow('', null),
    contact: Joi.string().max(200).allow('', null)
  }).optional()
});

function validateArticle(req, res, next) {
  const candidate = {
    title: req.body.title,
    description: req.body.description,
    owner: req.body.owner ? JSON.parse(req.body.owner || '{}') : undefined
  };
  const { error } = articleSchema.validate(candidate, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: 'Validation error', details: error.details });
  }
  // attach sanitized payload
  req.validatedArticle = candidate;
  next();
}

module.exports = { validateArticle };
