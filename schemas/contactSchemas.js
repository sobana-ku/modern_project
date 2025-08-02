import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  department: String,
  message: String,
  status: {
    type: String,
    default: 'pending'
  },
  reply: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', contactSchema);
