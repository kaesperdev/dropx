import { newShortlink } from '../controllers/shortlink.controller.js';

import multer from 'fastify-multer';
import { rateLimiter } from '../server.js';

const upload = multer();

const shortlinkRoutes = async (fastify, options) => {
  fastify.post(
    '/shorturl/new',
    { preHandler: [rateLimiter, upload.none()] },
    newShortlink
  );
};

export default shortlinkRoutes;
