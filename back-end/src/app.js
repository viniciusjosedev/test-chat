const express = require('express');
const cors = require('cors');
const { createServer } = require('http');

const userRouter = require('./routes/user.router');

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.use(userRouter);

module.exports = server;
