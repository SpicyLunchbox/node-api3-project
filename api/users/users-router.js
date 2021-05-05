const express = require('express');
const Users = require('./users-model.js');
const Posts = require('../posts/posts-model.js');
const mw = require('../middleware/middleware.js');
const { restart } = require('nodemon');


const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
        .then(users => {
          res.status(200).json(users)
        })
        .catch(err => {
          res.status(500).json({message: `The users could not be retrieved`})
        })
});

router.get('/:id', mw.validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', mw.validateUser, (req, res) => {
  Users.insert(req.body)
        .then(user => {
          res.status(500).json(user);
        })
        .catch(err => {
          res.status(500).json({message: `error adding to users`})
        })
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(201).json(user)
      }else{
        res.status(404).json({message: `The user could not be found`})
      }
    })
    .catch(err => {
      res.status(500).json({message:`Error updating the user`
      })
    })
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', mw.validateUserId, (req, res) => {
  Users.remove(req.params.id)
        .then(user => {
          res.status(200).json(user)
        })
        .catch(err => {
          res.status(500).json({message:`The user could not be deleted`})
        })
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', mw.validateUserId, (req, res) => {
  Posts.get(req.params.id)
        .then(posts => {
          res.status(200).json(posts)
        })
        .catch(err => {
          res.status(500).json({message: `the posts could not be retrieved`})
        })
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, (req, res) => {
  Posts.insert(req.params.id, req.body)
        .then(post => {
          res.status(201).json({post})
        })
        .catch(err => {
          res.status(500).json({message: `Could not add post to user`})
        })
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;