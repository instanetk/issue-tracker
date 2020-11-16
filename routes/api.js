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
const { Issue, validateIssue } = require("../models/issue");

// const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      var project = req.params.project;
      console.log(project);
    })

    .post(function (req, res) {
      var project = req.params.project;
      console.log(project, req.body);
    })

    .put(function (req, res) {
      var project = req.params.project;
    })

    .delete(function (req, res) {
      var project = req.params.project;
    });
};
