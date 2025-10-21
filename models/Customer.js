import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);
