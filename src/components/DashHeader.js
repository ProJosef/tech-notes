'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter } from 'next/navigation';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

export default function DashHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const logoutButton = (
    <button
      onClick={async () => {
        signOut({ callbackUrl: '/', redirect: true });
      }}
      className="icon-button"
      title="Logout"
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const onNewNoteClicked = () => router.push('/dash/notes/new');
  const onNewUserClicked = () => router.push('/dash/users/new');
  const onNotesClicked = () => router.push('/dash/notes');
  const onUsersClicked = () => router.push('/dash/users');

  let dashClass = null;
  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = 'dash-header__container--small';
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button className="icon-button" title="New Note" onClick={onNewNoteClicked}>
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button className="icon-button" title="New User" onClick={onNewUserClicked}>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let userButton = null;
  if (session?.permission) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      userButton = (
        <button className="icon-button" title="Users" onClick={onUsersClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <button className="icon-button" title="Notes" onClick={onNotesClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const buttonContent = (
    <>
      {newNoteButton}
      {newUserButton}
      {notesButton}
      {userButton}
      {logoutButton}
    </>
  );
  return (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link href="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">{buttonContent}</nav>
      </div>
    </header>
  );
}
