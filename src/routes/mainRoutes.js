import { defaultRoute, getResource } from '../controllers/main.controller.js';

const mainRoutes = async (fastify, options) => {
  fastify.get('/', defaultRoute);
  fastify.get('/:id', getResource);
};

export default mainRoutes;
