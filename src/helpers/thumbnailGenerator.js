const sharp = require('sharp');

module.exports = function generateThumbnail(path, width, height, output) {
    sharp(path).resize(width, height).toFile(output, (err, image) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(image);
        }
    });
}