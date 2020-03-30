Testing Project

## Environment
- Node version 8.16.0

## Install Project
- npm install or yarn

## Run MongoDB
- mongod

## Run Server
- npm start

Run server on http://localhost:9000

## Run Frontend
- npm run start-js

Run npm start to start the app then go to http://localhost:3000

## App Feature
### Backend (Node.js, Express.js, MongoDB)
- Models: Posts, Users
- API endpoints:
  * Auth API for user login and signup
  * CRUD API endpoints for posts (Get all list, Create new, Edit, Delete, Upvote and DownVote)
- API unit tests using Mocha / chai

### Frontend (React, Redux, Semantic-ui)
- Pages: login, singup, Board pages
- Login
  User can login with email and password if it exists already.
- Sign up
  User can signup with email, password and user name.
- Board (Main page for Bulletin posts)
  User can create New Bulletin with title, content body and tags.
  User can view all posts.
  User can edit and delete any posts that user created.
  User can upvote and downvote all posts.
  User can filter the posts by tags using tags filter dropdown.
  User can order the posts by Title, Created At and Popularity.
  All pages are responsive on a phone, tablet, laptop and desktop.

