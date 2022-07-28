import mongoose from 'mongoose';

const UploadsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});

const UploadsModel = mongoose.model('Uploads', UploadsSchema);

export default UploadsModel;
