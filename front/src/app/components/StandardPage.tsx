import { Outlet } from 'react-router-dom';

export function StandardPage() {
  return (
    <div className="bg-neonPurple h-screen flex flex-col items-center justify-center">
      <Outlet/>
    </div>
  );
}