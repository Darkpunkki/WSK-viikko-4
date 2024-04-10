import sharp from 'sharp';

const createThumbnail = (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log('req.file in createThumbnail', req.file);
  // TODO: use file path to create 160x160 png thumbnail with sharp
  const [fileName, extension] = req.file.filename.split('.');

  sharp(req.file.path)
    .resize(160, 160)
    .png()
    .toFile(`${req.file.destination}/${fileName}_thumb.${extension}`)
    .then(() => next());
};

export {createThumbnail};
