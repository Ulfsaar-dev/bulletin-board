"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: { type: String },
  title: String,
  body: String,
  tags: String,
  upvote: { type: Number, min: 0, default: 0 },
  downvote: { type: Number, min: 0, default: 0 },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  active: Boolean
});

/**
 * Validations
 */
const isExisting = value => {
  return value && value.length;
};

PostSchema.path("title").validate(title => {
  return isExisting(title);
}, "post entry can not be saved without name.");

PostSchema.path("body").validate(body => {
  return isExisting(body);
}, "post entry can not be saved without the body.");

PostSchema.path("tags").validate(tags => {
  return isExisting(tags);
}, "post entry can not be saved without tags.");

module.exports = mongoose.model("Post", PostSchema);
