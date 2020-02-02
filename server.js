const express = require("express");
const app = express();
const kmeans = require('node-kmeans');
const DATASET = require('./mnist-reader').DATASET;

let startServer = () => {
  app.get('/', (req, res) => {
    res.send("Welcome to Kmean server! did you mean to ask for /kmean ?");
    res.end();
  });

  app.get('/kmean', async (req, res) => {
    res.send("Here You'll get your answer");
    res.end();
  });

  const port = process.env.port || 8080;

  app.listen(port, () => console.log(`Listetning on port ${port} ... `));
}


// startServer();