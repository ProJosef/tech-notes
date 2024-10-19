import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Employee',
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// Mongoose model check to prevent model redefinition errors
const Users = mongoose.models.Users || mongoose.model('Users', UsersSchema);

export default Users;
