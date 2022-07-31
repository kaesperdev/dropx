const uploadsPath = process.env.UPLOADS_PATH || 'uploads'

import { readFileSync } from 'fs';

import UploadsModel from '../models/Uploads.js';

const defaultRoute = (req, res) => {
  return res.code(301).redirect(process.env.REDIRECT);
};

const getResource = async (req, res) => {
  const id = req.params.id;
  const upload = await UploadsModel.findOne({ id }).lean();
  if (!upload) {
    return res.code(404).send({
      statusCode: 404,
      error: 'Not found',
      message: 'No image, paste or shortlink found for this id',
    });
  }

  try {
    if (upload.type === 'image') {
      res.header('Content-Type', upload.mimetype);
      return res
        .code(200)
        .send(
          readFileSync(`${uploadsPath}/${id}.${upload.extension}`)
        );
    } else if (upload.type === 'paste') {
      res.header('Content-Type', 'text/plain');
      return res.code(200).send(upload.content);
    } else if (upload.type === 'shortlink') {
      return res.code(301).redirect(upload.content);
    }
  } catch (err) {
    return res.code(500).send({
      statusCode: 500,
      error: 'Internal server error',
      message: 'Could not serve paste or image',
    });
  }
};

export { defaultRoute, getResource };
