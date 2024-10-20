import { getSessionData } from '@/lib/session';
import GoHomeButton from './GoHomeButton';

export default async function DashFooter() {
  const session = await getSessionData();

  return (
    <footer className="dash-footer">
      <GoHomeButton />
      <p>Current User: {session.user.username}</p>
      <p>Status: {session.user.role}</p>
    </footer>
  );
}
