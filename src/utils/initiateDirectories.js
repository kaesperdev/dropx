uploadsPath = process.env.UPLOADS_PATH || 'uploads'

import { existsSync, mkdirSync } from 'fs';

const initiateDirectories = () => {
  if (!existsSync(uploadsPath))
    mkdirSync(uploadsPath);
};

export { initiateDirectories };
