const kmeans = require('node-kmeans');
const DATASET = require('./mnist-reader');
const DEFAULT_K = 4;
const NUM_OF_SAMPLES = 5;


let clusterize = async (k) => {
    k = Number(k) ? k : DEFAULT_K;
    return kmeans.clusterize(DATASET.DATASET_ARRAY, { k }, (err, res) => {
        if (err) console.error(err);
    });
}

let formatClusters = (clusters) => {
    let formattedClusters = {};
    for (let i = 0; i < clusters.length; i++) {
        let center = clusters[i].centroid;
        let randoms = pickRandoms(clusters[i].cluster, NUM_OF_SAMPLES);
    }
    return formattedClusters;
}

let pickRandoms = (clusters, n) => {
    let randoms = [];
    let indexes = clusters.map((x, i) => i);
    while (randoms.length < n) {
        let rand = indexes[Math.floor(Math.random() * indexes.length)];
        randoms.push(clusters[rand]);
        indexes.splice(indexes.indexOf(rand), 1)
    }
    return randoms;
}

clusterize(4).then(x => {
    formatClusters(x.groups);
})
module.exports.formatClusters = formatClusters;
module.exports.clusterize = clusterize;