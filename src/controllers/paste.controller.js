import genNewUploadId from '../utils/generateNewUploadId.js';
import checkUploadSize from '../utils/sizeLimiter.js';
import UploadsModel from '../models/Uploads.js';

const newPaste = async (req, res) => {
  if (!req.body.content) {
    return res.code(400).send({
      statusCode: 400,
      error: 'No paste content provided',
      message: 'Please provide paste content',
    });
  }

  if (!checkUploadSize(req.headers['content-length'], 'paste'))
    return res.code(400).send({
      statusCode: 400,
      error: 'Paste too large',
      message: `Paste must be less than ${process.env.MAX_PASTE_SIZE} in size`,
    });

  const newUploadId = genNewUploadId();

  try {
    await UploadsModel.create({
      id: newUploadId,
      type: 'paste',
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
    message: 'Paste uploaded successfully',
    url: `${process.env.DOMAIN}/${newUploadId}`,
  });
};

export { newPaste };
