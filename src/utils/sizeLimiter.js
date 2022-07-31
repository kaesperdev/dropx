const maxImageSize = process.env.MAX_IMAGE_SIZE.replace('MB', '') || Infinity;
const maxPasteSize = process.env.MAX_PASTE_SIZE.replace('MB', '') || Infinity;

console.log(maxImageSize, maxPasteSize);

const checkUploadSize = (size, uploadType) => {
  if (uploadType === 'image') {
    return size / 1024 / 1024 <= maxImageSize;
  } else if (uploadType === 'paste') {
    return size / 1024 / 1024 <= maxPasteSize;
  }
};

export default checkUploadSize;
