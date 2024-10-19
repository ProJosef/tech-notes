import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const autoIncrement = AutoIncrement(mongoose);

const NotesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

NotesSchema.plugin(autoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500,
});

const Notes = mongoose.models.Notes || mongoose.model('Notes', NotesSchema);

export default Notes;
