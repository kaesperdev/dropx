import { newShortlink } from '../controllers/shortlink.controller.js';

import multer from 'fastify-multer';

const upload = multer();

const shortlinkRoutes = async (fastify, options) => {
  fastify.post('/shorturl/new', { preHandler: upload.none() }, newShortlink);
};

export default shortlinkRoutes;
