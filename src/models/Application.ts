import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  resume: {
    type: String,
    required: [true, 'Resume file is required'],
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Rejected', 'Hired'],
    default: 'Applied',
  },
  internalNotes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Application || mongoose.model('Application', applicationSchema);
