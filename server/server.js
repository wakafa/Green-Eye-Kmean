const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const kmeanHandler = require('./kmean-handler');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
    let clusters = await kmeanHandler.clusterize(req.body.k);
    let formattedClusters = kmeanHandler.formatClustersWithRandomSamples(clusters);
    res.json({ clusters: formattedClusters, k_used: req.body.k });
    res.end();
  })

  const port = process.env.port || 8080;

  app.listen(port, () => console.log(`Listetning on port ${port} ... `));
}

startServer();