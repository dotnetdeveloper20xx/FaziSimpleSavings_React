import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../state/store";

export default function LandingPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-10 space-y-6 bg-base-100 text-center'>
      <h1 className='text-3xl font-bold'>Welcome to FaziSimpleSavings</h1>
      <p className='text-gray-600'>
        Start saving with automated goals and progress tracking.
      </p>
      <div className='flex gap-4'>
        <a href='/login' className='btn btn-primary'>
          Login
        </a>
        <a href='/register' className='btn btn-outline'>
          Register
        </a>
      </div>
    </div>
  );
}
