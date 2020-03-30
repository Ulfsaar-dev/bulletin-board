"use strict";

const _ = require("lodash");
const Post = require("./post.model");
const moment = require("moment");

const validationError = (res, err) => {
  const response = {
    status: 422,
    message: err.messsage
  };

  return res.status(422).json(response);
};

const handleError = (res, err) => {
  const response = {
    status: 500,
    message: err.message
  };

  return res.status(500).send(response);
};

const handle404 = res => {
  const response = {
    status: 404,
    message: "Sorry! Not found."
  };

  return res.status(404).send(response);
};

// Get list of Posts
exports.index = (req, res) => {
  let page = 0;
  let limit = 100;
  let query = {};
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
    if (limit == 0) {
      limit = 100;
    }
  }

  // if (req.user.role == "admin"){
  Post.find(query)
    .skip(page * limit)
    .limit(limit)
    .exec((err, posts) => {
      if (err) {
        return handleError(res, err);
      }
      const response = {
        metadata: {
          resultset: {
            count: posts.length,
            offset: page * limit,
            limit: limit
          }
        },
        results: posts
      };
      return res.status(200).json(response);
    });
};

// Get a single post
exports.show = (req, res) => {
  if (req.user.role == "admin") {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        return handleError(res, err);
      }
      if (!post) {
        return handle404(res);
      }

      return res.json(post);
    });
  } else {
    Post.findOne({ userId: req.user.id, _id: req.params.id }, (err, post) => {
      if (err) {
        return handleError(res, err);
      }
      if (!post) {
        return handle404(res);
      }

      return res.json(post);
    });
  }
};

// Creates a new post in the DB
exports.create = (req, res) => {
  var newPost = new Post(req.body);
  newPost.userId = req.user.id;
  if (!newPost.userId)
    return res.sendStatus({
      status: 422,
      message: "Invalid Request"
    });

  Post.create(newPost, (err, post) => {
    if (err) return validationError(res, err);

    return res.status(201).json(post);
  });
};

// Updates an existing post in the DB
exports.update = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }

  Post.findById(req.params.id, (err, post) => {
    if (err) return handleError(res, err);
    if (!post) return handle404(res);

    var updated = _.merge(post, req.body);
    updated.save(err => {
      if (err) return handleError(res, err);
      return res.status(200).json(post);
    });
  });
};

// Deletes a post from the DB
exports.destroy = (req, res) => {
  if (req.user.role == "admin") {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        return handleError(res, err);
      }
      if (!post) {
        return handle404(res);
      }

      post.remove(err => {
        if (err) {
          return handleError(res, err);
        }
        return res.sendStatus(204);
      });
    });
  } else {
    Post.findOne({ userId: req.user.id, _id: req.params.id }, (err, post) => {
      if (err) {
        return handleError(res, err);
      }
      if (!post) {
        return handle404(res);
      }

      post.remove(err => {
        if (err) {
          return handleError(res, err);
        }
        return res.sendStatus(204);
      });
    });
  }
};
