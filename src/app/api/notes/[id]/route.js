import connectDB from '@/lib/db';
import Notes from '@/models/Notes';

// GET single note by ID
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const note = await Notes.findById(id);
    if (!note) {
      return new Response(JSON.stringify({ error: 'Note not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(note), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch note' }), { status: 500 });
  }
}

// PUT (Update note)
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { user, title, text, completed } = await req.json();

    if (!user || !title || !text) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    const duplicate = await Notes.findOne({ title });
    if (duplicate && duplicate._id.toString() !== id) {
      return new Response(JSON.stringify({ error: 'Duplicate note title' }), { status: 409 });
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      id,
      { user, title, text, completed },
      { new: true }
    );

    if (!updatedNote) {
      return new Response(JSON.stringify({ error: 'Note not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedNote), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to update note' }), { status: 500 });
  }
}

// DELETE (Delete note)
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const note = await Notes.findByIdAndDelete(id);
    if (!note) {
      return new Response(JSON.stringify({ error: 'Note not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Note deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to delete note' }), { status: 500 });
  }
}
