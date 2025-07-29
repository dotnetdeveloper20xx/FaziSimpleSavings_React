import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { loginSuccess } from "../state/authSlice";
import { login } from "../core/services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(email, password);
      const token = response.data.data;
      const user = { email };

      dispatch(loginSuccess({ token, user }));
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-200 px-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white w-full max-w-md p-8 rounded-xl shadow-lg space-y-5'
      >
        <h2 className='text-3xl font-bold text-center text-blue-600'>
          Welcome Back 👋
        </h2>
        <p className='text-center text-sm text-gray-500'>
          Please enter your credentials to access your dashboard.
        </p>

        {error && (
          <div className='alert alert-error text-sm px-4 py-2 rounded'>
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor='email'
            className='label text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='you@example.com'
            required
            className='input input-bordered w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='label text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            placeholder='••••••••'
            required
            className='input input-bordered w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-primary w-full'>
          Login
        </button>

        <p className='text-sm text-center mt-2 text-gray-600'>
          Don't have an account?{" "}
          <Link
            to='/register'
            className='text-blue-600 hover:underline font-medium'
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
