if (process.env.NODE_ENV !== 'production') {
  (await import('dotenv')).config();
}

import { initiateDirectories } from './utils/initiateDirectories.js';
initiateDirectories();

import mongoose from 'mongoose';
import Fastify from 'fastify';
import multer from 'fastify-multer';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyAutoload from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

await mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Connection to MongoDB failed!\n', err);
    process.exit(1);
  });

const fastify = Fastify({
  logger: {
    level: 'info',
  },
  trustProxy: process.env.ENABLE_TRUST_PROXY === 'true',
});

await fastify.register(fastifyRateLimit, {
  global: false,
});

const rateLimiter = fastify.rateLimit({
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 20,
  timeWindow: Number(process.env.RATE_LIMIT_TIME_WINDOW) || 60000,
});

fastify.register(multer.contentParser);

fastify.register(fastifyAutoload, {
  dir: join(__dirname, 'routes'),
});

const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT,
      host: process.env.HOST,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export { rateLimiter };
