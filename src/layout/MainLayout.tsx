import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function MainLayout() {
  const location = useLocation();
  const { items: notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <aside className='w-64 bg-base-200 p-6'>
        <h1 className='text-2xl font-bold mb-6'>FaziSimpleSavings</h1>
        <nav className='flex flex-col gap-4'>
          <Link
            to='/dashboard'
            className={`btn btn-ghost justify-start ${
              isActive("/dashboard") && "btn-active"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to='/notifications'
            className={`btn btn-ghost justify-start relative ${
              isActive("/notifications") && "btn-active"
            }`}
          >
            Notifications
            {unreadCount > 0 && (
              <span className='badge badge-error absolute right-4 top-1 text-white text-xs'>
                {unreadCount}
              </span>
            )}
          </Link>

          <Link
            to='/settings'
            className={`btn btn-ghost justify-start ${
              isActive("/settings") && "btn-active"
            }`}
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className='flex-1 bg-base-100 p-6'>
        <Outlet />
      </main>
    </div>
  );
}
