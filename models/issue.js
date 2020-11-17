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
    assignedTo: Joi.string().min(0).max(255),
    status: Joi.string().min(0).max(255),
    createdOn: Joi.date().required(),
    updatedOn: Joi.date(),
    open: Joi.boolean().required(),
  });
  return schema.validate(issue);
}

exports.Issue = Issue;
exports.validate = validateIssue;
