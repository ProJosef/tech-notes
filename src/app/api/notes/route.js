import connectDB from '@/lib/db';
import Users from '@/models/Users';
import Notes from '@/models/Notes';

// GET all notes
export async function GET(req) {
  try {
    await connectDB();
    const notes = await Notes.find();
    if (!notes?.length) {
      return new Response(JSON.stringify({ error: 'No notes found' }), { status: 404 });
    }

    const notesWithUsername = await Promise.all(
      notes.map(async (note) => {
        const user = await Users.findById(note.user);
        return { username: user.username, ...note.toObject() };
      })
    );

    return new Response(JSON.stringify(notesWithUsername), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch notes' }), { status: 500 });
  }
}

// POST (Create new note)
export async function POST(req) {
  try {
    await connectDB();
    const { user, title, text } = await req.json();

    if (!user || !title || !text) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    const duplicate = await Notes.findOne({ title });
    if (duplicate) {
      return new Response(JSON.stringify({ error: 'Duplicate note title' }), { status: 409 });
    }

    const newNote = await Notes.create({ user, title, text });
    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create note'}), { status: 500 });
  }
}
