'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { updateNote, deleteNote } from '@/services/notesService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function EditNoteForm({ users, note }) {
  const router = useRouter();
  const [userId, setUserId] = useState(note.user);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  const options = users.map((user) => (
    <option key={user._id} value={user._id}>
      {user.username}
    </option>
  ));

  const created = new Date(note.createdAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const updated = new Date(note.updatedAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const canSave = [title, text, userId].every(Boolean);

  const onSaveNoteClicked = async () => {
    const NoteData = { user: userId, title, text, completed };
    try {
      if (canSave) {
        await updateNote(note._id, NoteData);
        router.push('/dash/notes');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onDeleteNoteClicked = async () => {
    try {
      await deleteNote(note._id);
      router.push('/dash/notes');
    } catch (error) {
      setError(error.message);
    }
  };

  let deleteButton = null;
  if (session?.permission) {
    deleteButton = (
      <button className="icon-button" title="Delete" onClick={onDeleteNoteClicked}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  const content = (
    <>
      {error && <p className="errmsg">{error}</p>}

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note #{note.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>
        <label className="form__label" htmlFor="note-title">
          Title:
        </label>
        <input
          className={`form__input ${!title && 'form__input--incomplete'}`}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="form__label" htmlFor="note-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${!text && 'form__input--incomplete'}`}
          id="note-text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="form__row">
          <div className="form__divider">
            <label className="form__label form__checkbox-container" htmlFor="note-completed">
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
            </label>

            <label className="form__label form__checkbox-container" htmlFor="note-username">
              ASSIGNED TO:
            </label>
            <select
              id="note-username"
              name="username"
              className={`form__input ${!userId && 'form__input--incomplete'}`}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return content;
}
