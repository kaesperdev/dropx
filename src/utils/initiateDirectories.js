import { existsSync, mkdirSync } from 'fs';

const initiateDirectories = () => {
  if (!existsSync(process.env.UPLOADS_PATH))
    mkdirSync(process.env.UPLOADS_PATH);
};

export { initiateDirectories };
