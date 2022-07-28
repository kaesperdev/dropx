import validUrl from 'valid-url';

import genNewUploadId from '../utils/generateNewUploadId.js';
import UploadsModel from '../models/Uploads.js';

const newShortlink = (req, res) => {
  if (!req.body.content) {
    return res.code(400).send({
      statusCode: 400,
      error: 'No content provided',
      message: 'Please provide content',
    });
  }

  const newUploadId = genNewUploadId();

  if (!validUrl.isUri(req.body.content)) {
    return res.code(400).send({
      statusCode: 400,
      error: 'Invalid URL',
      message: 'Please provide a valid URL',
    });
  }

  try {
    UploadsModel.create({
      id: newUploadId,
      type: 'shortlink',
      mimetype: 'text/plain',
      extension: 'txt',
      content: req.body.content,
      timestamp: Date.now(),
    });
  } catch (err) {
    return res.code(500).send({
      statusCode: 500,
      error: 'Internal server error',
      message: 'Could not save paste',
    });
  }

  return res.send({
    statusCode: 200,
    message: 'Shortlink created successfully',
    url: `${process.env.DOMAIN}/${newUploadId}`,
  });
};

export { newShortlink };
