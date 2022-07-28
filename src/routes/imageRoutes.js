import { newImage } from '../controllers/image.controller.js';

import multer from 'fastify-multer';

const upload = multer();

const imageRoutes = async (fastify, options) => {
  fastify.post('/image/new', { preHandler: upload.single('image') }, newImage);
};

export default imageRoutes;
