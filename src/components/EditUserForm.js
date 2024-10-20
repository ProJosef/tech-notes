'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROLES } from '@/config/roles';
import { updateUser, deleteUser } from '@/services/usersService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

export default function EditUserForm({ user }) {
  const router = useRouter();
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(true);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [active, setActive] = useState(user.active);
  const [role, setRole] = useState(user.role);
  const [error, setError] = useState('');

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave = [role, validUsername, validPassword].every(Boolean);
  } else {
    canSave = [role, validUsername].every(Boolean);
  }

  const onSaveUserClicked = async () => {
    let updatedData;
    if (password) {
      updatedData = { username, password, role, active };
    } else {
      updatedData = { username, role, active };
    }
    try {
      if (canSave) {
        await updateUser(user._id, updatedData);
        router.push('/dash/users');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onDeleteUserClicked = async () => {
    try {
      await deleteUser(user._id);
      router.push('/dash/users');
    } catch (error) {
      setError(error.message);
    }
  };

  const content = (
    <>
      {error && <p className="errmsg">{error}</p>}

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button className="icon-button" title="Delete" onClick={onDeleteUserClicked}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${!validUsername && 'form__input--incomplete'}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{' '}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${!validPassword && 'form__input--incomplete'}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="form__label form__checkbox-container" htmlFor="user-active">
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </label>

        <label className="form__label" htmlFor="role">
          ASSIGNED ROLE:
        </label>
        <select
          id="role"
          name="role"
          className={`form__select ${!Boolean(role) && 'form__input--incomplete'}`}
          size="3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
}
