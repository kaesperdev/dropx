import { customAlphabet } from 'nanoid';

const ALPHABET =
  '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const genNewUploadId = () => customAlphabet(ALPHABET, 10)();

export default genNewUploadId;
