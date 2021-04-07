const express = require('express');
const usersRouter = require('./users/users-router.js');
const mw = require('./middleware/middleware.js');

const server = express();

server.use(express.json());
server.use(mw.logger);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
