import { writeFileSync } from 'fs';

import genNewUploadId from '../utils/generateNewUploadId.js';
import checkUploadSize from '../utils/sizeLimiter.js';
import UploadsModel from '../models/Uploads.js';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const newImage = async (req, res) => {
  if (!req.file || !allowedMimeTypes.includes(req.file.mimetype))
    return res.code(400).send({
      statusCode: 400,
      error: 'Invalid file type',
      message: 'Only JPEG, PNG, and GIF files are allowed',
    });

  if (!checkUploadSize(req.headers['content-length'], 'image'))
    return res.code(400).send({
      statusCode: 400,
      error: 'Image too large',
      message: `Image must be less than ${process.env.MAX_IMAGE_SIZE} in size`,
    });

  const newUploadId = genNewUploadId();
  const fileExtension = req.file.originalname.split('.').pop();

  try {
    writeFileSync(
      `${process.env.UPLOADS_PATH}/${newUploadId}.${fileExtension}`,
      req.file.buffer
    );
    await UploadsModel.create({
      id: newUploadId,
      type: 'image',
      mimetype: req.file.mimetype,
      extension: fileExtension,
      timestamp: Date.now(),
    });
  } catch (err) {
    return res.code(500).send({
      statusCode: 500,
      error: 'Internal server error',
      message: 'Could not save image',
    });
  }

  return res.send({
    statusCode: 200,
    message: 'File uploaded successfully',
    url: `${process.env.DOMAIN}/${newUploadId}`,
  });
};

export { newImage };
