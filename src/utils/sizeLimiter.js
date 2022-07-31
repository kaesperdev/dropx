let maxImageSize = process.env.MAX_IMAGE_SIZE || Infinity;
let maxPasteSize = process.env.MAX_PASTE_SIZE || Infinity;

if(typeof maxImageSize === 'string') {
  maxImageSize = maxImageSize.replace('MB', '')
}

if(typeof maxPasteSize === 'string') {
  maxPasteSize = maxPasteSize.replace('MB', '')
}

const checkUploadSize = (size, uploadType) => {
  if (uploadType === 'image') {
    return size / 1024 / 1024 <= maxImageSize;
  } else if (uploadType === 'paste') {
    return size / 1024 / 1024 <= maxPasteSize;
  }
};

export default checkUploadSize;
