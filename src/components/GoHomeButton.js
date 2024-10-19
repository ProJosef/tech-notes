'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function GoHomeButton() {
  const pathname = usePathname();
  const router = useRouter();

  const onGoHomeClicked = () => router.push('/dash');

  let content = null;
  if (pathname !== '/dash') {
    content = (
      <button className="dash-footer__button icon-button" title="Home" onClick={onGoHomeClicked}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  return content;
}
