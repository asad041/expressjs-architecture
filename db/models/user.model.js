const { mongoose, connectDB } = require('../connect-db');

const userSchema = new mongoose.Schema(
  {
    serialId: {
      type: Number,
      required: [true, 'serial-id is required'],
      unique: [true, 'serial-id must be unique'],
      sparse: true,
      trim: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true },
  }
);

const User = connectDB.model('users', userSchema, 'users');

module.exports = User;
