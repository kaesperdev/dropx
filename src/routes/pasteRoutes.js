import { newPaste } from '../controllers/paste.controller.js';

import multer from 'fastify-multer';
import { rateLimiter } from '../server.js';

const upload = multer({
  limits: {
    fieldSize: Infinity,
  },
});

const pasteRoutes = async (fastify, options) => {
  fastify.post(
    '/paste/new',
    { preHandler: [rateLimiter, upload.none()] },
    newPaste
  );
};

export default pasteRoutes;
