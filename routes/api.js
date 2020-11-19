/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
// var MongoClient = require("mongodb");
// var ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const { Issue, validate } = require("../models/issue");

// const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(async function (req, res) {
      let project = req.params.project;
      let options = req.query;
      let query;

      if (Object.keys(options).length === 0 && options.constructor === Object) {
        query = { project };
      } else {
        query = Object.assign({ project }, options);
      }

      try {
        let issues = await Issue.find(query);

        let result = [];
        issues.map((entry) => {
          let obj = {
            _id: entry._id,
            issue_title: entry.issue_title,
            issue_text: entry.issue_text,
            created_on: entry.created_on,
            updated_on: entry.updated_on,
            created_by: entry.created_by,
            assigned_to: entry.assigned_to,
            open: entry.open,
            status_text: entry.status_text,
          };

          result.push(obj);
        });

        console.log(result, issues);

        res.send(result);
      } catch (ex) {
        console.log(ex.message);
      }
    })

    .post(async function (req, res) {
      const { error } = validate(req.body);
      if (error) res.status(400).send(error.details[0].message);

      var project = req.params.project;

      const entry = {
        project,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || "",
        status_text: req.body.status_text || "",
      };

      console.log(req.body, entry);

      try {
        const issue = new Issue(entry);
        await issue.save();
        res.status(200).json(issue);
      } catch (ex) {
        console.log(ex.message);
        res.status(400).send(ex.message);
      }
    })

    .put(async function (req, res) {
      // Copy req.body and delete _id field
      const payload = { ...req.body };
      delete payload._id;

      // Check if payload object content is null or empty strings
      function checkProperties(obj) {
        for (let key in obj) {
          if (obj[key] !== null && obj[key] != "") return false;
        }
        return true;
      }

      let nofields = checkProperties(payload);
      if (nofields) return res.json("no updated field sent");

      // Proceed to update object values
      try {
        // Retrieve entry from database
        let id = req.body._id;
        let issues = await Issue.findById({ _id: id });
        if (!issues) return res.json("could not update " + id);

        // Check client's object and update included fields
        for (let key of Object.keys(payload)) {
          if (req.body[key] !== "") {
            issues[key] = req.body[key];
          } else {
            issues[key] = issues[key];
          }
          // Write the updated date and check for issue open status
          issues.updated_on = Date.now();
          issues.open = req.body.open || true;
          // Update dabatase
          const update = await issues.save();
        }
        res.json("updated successfully");
      } catch (ex) {
        console.log(ex.message);
      }
    })

    .delete(async function (req, res) {
      let id = req.body._id;
      let valid = mongoose.isValidObjectId(id);
      if (!valid) return res.status(200).json("_id error");

      try {
        const issue = await Issue.deleteOne({ _id: id });
        if (issue.deletedCount === 0)
          return res.status(200).json("could not delete " + id);

        res.status(200).json("deleted " + id);
      } catch (ex) {
        console.log(ex.message);
      }
    });
};
