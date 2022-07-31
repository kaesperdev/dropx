const maxImageSize = process.env.MAX_IMAGE_SIZE || Infinity;
const maxPasteSize = process.env.MAX_PASTE_SIZE || Infinity;

const checkUploadSize = (size, uploadType) => {
  if (uploadType === 'image') {
    return size / 1024 / 1024 <= maxImageSize.replace('MB', '');
  } else if (uploadType === 'paste') {
    return size / 1024 / 1024 <= maxPasteSize.replace('MB', '');
  }
};

export default checkUploadSize;
