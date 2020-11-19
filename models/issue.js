const mongoose = require("mongoose");
const Joi = require("joi");

const issueSchema = new mongoose.Schema({
  project: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  issue_title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  issue_text: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000,
  },
  created_by: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  assigned_to: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 255,
  },
  status_text: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 255,
  },
  created_on: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updated_on: {
    type: Date,
    required: false,
    default: null,
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
    issue_title: Joi.string().min(3).max(255).required(),
    issue_text: Joi.string().min(3).max(1000).required(),
    created_by: Joi.string().min(3).max(255).required(),
    assigned_to: Joi.string().min(0).max(255),
    status_text: Joi.string().min(0).max(255),
    created_on: Joi.date(),
    updated_on: Joi.date(),
    open: Joi.boolean(),
  });
  return schema.validate(issue);
}

exports.Issue = Issue;
exports.validate = validateIssue;
