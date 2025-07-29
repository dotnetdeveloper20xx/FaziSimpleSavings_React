import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow-md p-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold text-blue-600'>FaziSimpleSavings</h1>
        <nav className='space-x-4'>
          <Link to='/dashboard' className='text-blue-500 hover:underline'>
            Dashboard
          </Link>
          <Link to='/notifications' className='text-blue-500 hover:underline'>
            Notifications
          </Link>
          <Link to='/settings' className='text-blue-500 hover:underline'>
            Settings
          </Link>
          <Link to='/login' className='text-red-500 hover:underline'>
            Logout
          </Link>
        </nav>
      </header>

      <main className='p-6'>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </main>
    </div>
  );
}
