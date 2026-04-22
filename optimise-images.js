const sharp = require('sharp');
const path = require('path');
const { globSync } = require('glob');

const client = 'mars-fitness-app';
const input = `./images/full/${client}/*`;
const output = './images/resized';
const sizes = [640, 960, 1280];

async function resize(file, size) {
  // Removes path and ext
  const name = path.basename(file, '.png');

  await sharp(file)
    .resize({ width: size })
    .jpeg({ progressive: true, quality: 75 })
    .toFile(`${output}/${name}-${size}.jpg`)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));

  await sharp(file)
    .resize({ width: size })
    .webp({ quality: 75 })
    .toFile(`${output}/${name}-${size}.webp`)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
}

const files = globSync(input);

files.forEach((file) => {
  sizes.forEach((size) => {
    resize(file, size);
  });
});
