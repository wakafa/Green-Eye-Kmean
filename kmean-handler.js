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

let formatClustersWithRandomSamples = (clusters) => {
    let groups = clusters.groups;
    let formattedClusters = {};
    for (let i = 0; i < groups.length; i++) {
        let center = groups[i].centroid;
        let randoms = pickRandoms(groups[i].cluster, NUM_OF_SAMPLES);
        let data = { center, randoms };
        formattedClusters[i] = data;
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

module.exports.formatClustersWithRandomSamples = formatClustersWithRandomSamples;
module.exports.clusterize = clusterize;