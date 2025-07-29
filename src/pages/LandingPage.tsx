import { useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { RootState } from "../state/store";

export default function LandingPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-base-100 px-6 py-12 text-center'>
      <div className='max-w-xl space-y-6'>
        <h1 className='text-4xl font-extrabold text-gray-800 leading-tight'>
          Welcome to <span className='text-blue-600'>FaziSimpleSavings</span>
        </h1>

        <p className='text-gray-600 text-lg'>
          Save smarter with goal tracking, automated deposits, and progress
          visualization.
        </p>

        <div className='flex justify-center gap-4 mt-6'>
          <Link to='/login' className='btn btn-primary btn-lg'>
            Login
          </Link>
          <Link to='/register' className='btn btn-outline btn-lg'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
