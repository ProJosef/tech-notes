'use client';

import { useState, useEffect } from 'react';
import { createUser } from '@/services/usersService';
import { useRouter } from 'next/navigation';
import { ROLES } from '@/config/roles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

export default function NewUser() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [role, setRole] = useState('Employee');
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

  const canSave = [role, validUsername, validPassword].every(Boolean);

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, password, role };
      if (canSave) {
        await createUser(userData);
        router.push('/dash/users');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const content = (
    <>
      {error && <p className="errmsg">{error}</p>}

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
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
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${!validPassword && 'form__input--incomplete'}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
