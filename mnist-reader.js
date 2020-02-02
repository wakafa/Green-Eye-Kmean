const fs = require('fs');
const dir = __dirname + '\\MNIST_DATASET\\';
const IMAGE_LIM = 59999;
const NUM_OF_ROWS = 28;
const NUM_OF_COLUMNS = 28;
const PIXEL_OFFEST = 15;
const ROW_OFFSET = 8;

var dataFileBuffer = fs.readFileSync(dir + 'train-images.idx3-ubyte');
var labelFileBuffer = fs.readFileSync(dir + 'train-labels.idx1-ubyte');
var pixelValues = [];

for (var image = 0; image <= IMAGE_LIM; image++) {
    var pixels = [];

    for (var x = 0; x < NUM_OF_ROWS; x++) {
        for (var y = 0; y < NUM_OF_COLUMNS; y++) {
            pixels.push(dataFileBuffer[(image * NUM_OF_ROWS * NUM_OF_COLUMNS) + (x + (y * NUM_OF_ROWS)) + PIXEL_OFFEST]);
        }
    }

    var imageData = {};
    imageData[JSON.stringify(labelFileBuffer[image + ROW_OFFSET])] = pixels;

    pixelValues.push(imageData);
}

module.exports.DATASET = pixelValues;