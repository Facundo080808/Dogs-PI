//const express = require('express');
import express from "express"
import cookieParser from "cookie-parser";
//const cookieParser = require('cookie-parser');
import bodyParser from "body-parser";
//const bodyParser = require('body-parser');
import morgan from "morgan";
//const morgan = require('morgan');
import router from "./routes/index.route.mjs";
//const routes = require('./routes/index.js');

import "./db.mjs"
//require('./db.js')


const server = express();

server.set('name', 'api');

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', router);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//module.exports = server;
export default server;