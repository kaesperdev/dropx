if (process.env.NODE_ENV !== 'production') {
  (await import('dotenv')).config();
}

import { initiateDirectories } from './utils/initiateDirectories.js';
initiateDirectories();

import mongoose from 'mongoose';
import Fastify from 'fastify';
import multer from 'fastify-multer';
import fastifyAutoload from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

await mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Successfully connected to MongoDB!')
}).catch(err => {
  console.log('Connection to MongoDB failed!\n', err)
  process.exit(1);
})

const fastify = Fastify({
  logger: {
    level: 'info',
  },
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
