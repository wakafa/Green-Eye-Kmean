const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const dir = __dirname + path.sep + 'MNIST_DATASET' + path.sep;
const IMAGE_LIM = 60000;
const IMG_WIDTH = 28;
const IMG_HEIGHT = 28;
const PIXEL_OFFEST = 16;
const ROW_OFFSET = 8;
const CHANNELS = 4;

let dataFileBuffer = fs.readFileSync(dir + 'train-images.idx3-ubyte');
let labelFileBuffer = fs.readFileSync(dir + 'train-labels.idx1-ubyte');
let pixelValues = [];


for (var image = 0; image < IMAGE_LIM; image++) {
    var pixels = [];

    for (var y = 0; y < IMG_HEIGHT; y++) {
        for (var x = 0; x < IMG_WIDTH; x++) {
            let imgIndex = (image * IMG_WIDTH * IMG_HEIGHT) + PIXEL_OFFEST;
            let pixelIndex = (x + (y * IMG_WIDTH));
            let pixelValue = dataFileBuffer.readUInt8(imgIndex + pixelIndex);
            for (let i = 0; i < CHANNELS; i++) {
                pixels.push(pixelValue);
            }
        }
    }

    var imageData = {};
    imageData[JSON.stringify(labelFileBuffer[image + ROW_OFFSET])] = pixels;

    pixelValues.push(imageData);
}

let groupedImages = {};
let datasetArray = [];
pixelValues.forEach(image => {
    for (let digit in image) {
        if (groupedImages[digit]) {
            groupedImages[digit].push(image[digit]);
        } else {
            groupedImages[digit] = [image[digit]];
        }
        datasetArray.push(image[digit]);
    }
})

let writePngImage = (source, name) => {
    name = name || 'newOut.png';
    var png = new PNG({
        width: 28,
        height: 28,
        filterType: -1
    })
    png.data = source;
    png.pack().pipe(fs.createWriteStream(name));
}

module.exports.DATASET = pixelValues;
module.exports.DATASET_ARRAY = datasetArray;
module.exports.DATASET_GROUPED_BY_LABEL = groupedImages;