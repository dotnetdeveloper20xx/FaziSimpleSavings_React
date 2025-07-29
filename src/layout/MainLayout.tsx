import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { logout } from "../state/authSlice";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items: notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className='min-h-screen flex flex-col'>
      {/* 🔝 Top Navigation Bar */}
      <header className='navbar bg-base-100 shadow-md px-6 fixed top-0 left-0 right-0 z-50'>
        <div className='flex-1'>
          <Link to='/' className='text-xl font-bold'>
            FaziSimpleSavings
          </Link>
        </div>

        <div className='flex-none space-x-2'>
          {!isAuthenticated ? (
            <>
              <Link to='/login' className='btn btn-sm btn-outline'>
                Login
              </Link>
              <Link to='/register' className='btn btn-sm btn-outline'>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to='/dashboard' className='btn btn-sm btn-outline'>
                Dashboard
              </Link>
              <button
                className='btn btn-sm btn-error'
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* 🧭 Sidebar + Main layout */}
      <div className='flex flex-1 pt-20'>
        {/* Sidebar */}
        <aside className='w-64 bg-base-200 p-6 hidden md:block'>
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
        <main className='flex-1 px-6 pt-4 bg-base-100'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
