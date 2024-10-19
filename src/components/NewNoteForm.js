'use client';

import { useState } from 'react';
import { createNote } from '@/services/notesService';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

export default function NewNoteForm({ users }) {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const options = users.map((user) => (
    <option key={user._id} value={user._id}>
      {user.username}
    </option>
  ));

  const canSave = [userId, title, text].every(Boolean);

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    try {
      const NoteData = { user: userId, title, text };
      if (canSave) {
        await createNote(NoteData);
        router.push('/dash/notes');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const content = (
    <>
      {error && <p className="errmsg">{error}</p>}

      <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>New Note</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input ${!title && 'form__input--incomplete'}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="form__label" htmlFor="text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${!text && 'form__input--incomplete'}`}
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label className="form__label form__checkbox-container" htmlFor="username">
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className={`form__input ${!userId && 'form__input--incomplete'}`}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="" disabled>
            Select a user
          </option>
          {options}
        </select>
      </form>
    </>
  );

  return content;
}
