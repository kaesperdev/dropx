import { newPaste } from '../controllers/paste.controller.js';

import multer from 'fastify-multer';

const upload = multer();

const pasteRoutes = async (fastify, options) => {
  fastify.post('/paste/new', { preHandler: upload.none() }, newPaste);
};

export default pasteRoutes;
