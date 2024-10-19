import DashHeader from '@/components/DashHeader';
import DashFooter from '@/components/DashFooter';

export default function DashLayout({ children }) {
  return (
    <>
        <DashHeader />
        <div className="dash-container">{children}</div>
        <DashFooter />
    </>
  );
}
