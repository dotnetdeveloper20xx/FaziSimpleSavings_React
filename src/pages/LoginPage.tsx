import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { loginSuccess } from "../state/authSlice";
import { login } from "../core/services/authService";

import { Link } from "react-router-dom";

// Inside your JSX:
<p className='text-sm text-center mt-4'>
  Don't have an account?{" "}
  <Link to='/register' className='text-blue-600 hover:underline'>
    Register here
  </Link>
</p>;

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
      const token = response.data.data; // Assuming your API returns { data: token }
      const user = { email }; // Optional: replace with actual user data if available

      dispatch(loginSuccess({ token, user }));
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md w-full max-w-md space-y-4'
      >
        <h2 className='text-2xl font-bold text-center text-blue-600'>Login</h2>

        {error && <div className='alert alert-error'>{error}</div>}

        <div>
          <label className='label'>Email</label>
          <input
            type='email'
            required
            className='input input-bordered w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className='label'>Password</label>
          <input
            type='password'
            required
            className='input input-bordered w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-primary w-full'>
          Login
        </button>

        <p className='text-sm text-center mt-4'>
          Don't have an account?{" "}
          <Link to='/register' className='text-blue-600 hover:underline'>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
