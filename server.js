const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const kmeans = require('node-kmeans');
const DATASET = require('./mnist-reader');
const DEFAULT_K = 4;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let startServer = () => {

  app.get('/', (req, res) => {
    res.send("Welcome to Kmean server! did you mean to ask for /kmean ?");
    res.end();
  });

  app.get('/kmean', async (req, res) => {
    res.send("Here You'll get your answer");
    res.end();
  });

  app.post('/kmean', async (req, res) => {
    let clusters = await clusterize(req.body.k);
    res.json({ clusters, k: req.body.k });
    res.end();
  })

  const port = process.env.port || 8080;

  app.listen(port, () => console.log(`Listetning on port ${port} ... `));
}

let clusterize = async (k) => {
  k = Number(k) ? k : DEFAULT_K;
  return kmeans.clusterize(DATASET.DATASET_ARRAY, { k }, (err, res) => {
    if (err) console.error(err);
  });
}


startServer();