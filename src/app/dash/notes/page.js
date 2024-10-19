import { fetchNotes } from '@/services/notesService';
import Note from '@/components/Note';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export default async function NotesList() {
  try {
    const token = await getToken({ req: { cookies: cookies() } });

    const notes = await fetchNotes();

    let filteredNotes = notes;
    if (token.role === 'Employee') {
      filteredNotes = notes.filter((note) => note.username === token.username);
    }

    const tableContent = filteredNotes?.length ? (
      filteredNotes.map((note) => <Note key={note._id} note={note} />)
    ) : (
      <tr className="table__row">
        <td className="table__cell" colSpan="6">
          You do not have notes
        </td>
      </tr>
    );

    const content = (
      <table className="table table--notes">
        <thead className="table_    _thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Status
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );

    return content;
  } catch (error) {
    return <p className={'errmsg'}>{error.message}</p>;
  }
}
