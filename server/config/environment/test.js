"use strict";

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: "mongodb://localhost/bulletin-board",
    options: { useMongoClient: true }
  }
};
