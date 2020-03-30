"use strict";

const express = require("express");
const controller = require("./post.controller");
const auth = require("../../../auth/auth.service");
const router = express.Router();

/*
 * user-authenticated area
 */

// get the list of post entries
router.get("/", auth.isAuthenticated(), controller.index);

// get the particular post entry
router.get("/:id", auth.isAuthenticated(), controller.show);

// create a new post entry
router.post("/", auth.isAuthenticated(), controller.create);

// update a post entry
router.put("/:id", auth.isAuthenticated(), controller.update);
router.patch("/:id", auth.isAuthenticated(), controller.update);

// delete a post entry
router.delete("/:id", auth.isAuthenticated(), controller.destroy);

module.exports = router;
