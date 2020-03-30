// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const mongoose = require("mongoose");
const config = require("./server/config/environment");
const User = require("./server/api/v1/user/user.model");
const Post = require("./server/api/v1/post/post.model");

const conn = mongoose.connect(config.mongo.uri, config.mongo.options, err => {
  mongoose.connection.db.dropDatabase();

  User.create(
    {
      name: "admin",
      email: "admin@bulletinboard.com",
      role: "admin",
      password: "password"
    },
    {
      name: "editor",
      email: "editor@bulletinboard.com",
      role: "manager",
      password: "password"
    },
    {
      name: "tester",
      email: "tester@bulletinboard.com",
      password: "password"
    },
    {
      name: "flower",
      email: "flower@bulletinboard.com",
      password: "password"
    },
    () => {
      console.log("Finished populating users.");

      User.findOne({ email: "tester@bulletinboard.com" }, (err, usr) => {
        if (err) done(err);

        Post.create(
          {
            userId: usr._id,
            title: "What is Lorem Ipsum 1",
            body:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            tags: "lorem, ipsum",
            upvote: 0,
            downvote: 0,
            active: true
          },
          {
            userId: usr._id,
            title: "What is Lorem Ipsum 2",
            body:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            tags: "lorem, ipsum",
            upvote: 0,
            downvote: 0,
            active: true
          },
          {
            userId: usr._id,
            title: "What is Lorem Ipsum 3",
            body:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            tags: "lorem, ipsum",
            upvote: 0,
            downvote: 0,
            active: true
          },
          () => {
            console.log("Finished populating seed posts.");
            process.exit();
          }
        );
      });
    }
  );
});
