import { fetchUsers } from '@/services/usersService';
import { fetchNoteById } from '@/services/notesService';
import EditNoteForm from '@/components/EditNoteForm';

export default async function EditNote({ params }) {
  const { id } = params;
  try {
    const users = await fetchUsers();
    const note = await fetchNoteById(id);

    return <EditNoteForm users={users} note={note} />;
  } catch (error) {
    return <p className={'errmsg'}>{error.message}</p>;
  }
}
