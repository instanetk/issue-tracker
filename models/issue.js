const mongoose = require("mongoose");
const Joi = require("joi");

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  text: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000,
  },
  createdBy: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  assignedTo: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  status: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedOn: {
    type: Date,
    required: false,
  },
  open: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Issue = mongoose.model("Issue", issueSchema);

function validateIssue(issue) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    text: Joi.string().min(3).max(1000).required(),
    createdBy: Joi.string().min(3).max(255).required(),
    assignedTo: Joi.string().min(3).max(255).required(),
    status: Joi.string().min(2).max(255).required(),
    createdOn: Joi.date().required(),
    updatedOn: Joi.date(),
    open: Joi.boolean().required(),
  });
  return schema.validate(issue);
}

exports.Issue = Issue;
exports.validate = validateIssue;
