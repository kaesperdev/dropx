import { newImage } from '../controllers/image.controller.js';

import multer from 'fastify-multer';
import { rateLimiter } from '../server.js';

const upload = multer();

const imageRoutes = async (fastify, options) => {
  fastify.post(
    '/image/new',
    { preHandler: [rateLimiter, upload.single('image')] },
    newImage
  );
};

export default imageRoutes;
