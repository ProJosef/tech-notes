import { fetchUsers } from '@/services/usersService';
import NewNoteForm from '@/components/NewNoteForm';

export default async function NewNote() {
  try {
    const users = await fetchUsers();
    return <NewNoteForm users={users} />;
  } catch (error) { 
    return <p className={'errmsg'}>{error.message}</p>;
  }
}
