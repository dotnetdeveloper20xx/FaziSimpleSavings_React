import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { RootState } from "../state/store";
import { registerUser } from "../state/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!form.firstName) errors.firstName = "First name is required";
    if (!form.lastName) errors.lastName = "Last name is required";
    if (!form.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email";
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 6) errors.password = "Password too short";
    return errors;
  };

  const errors = validate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form) as any);
    if (result.meta.requestStatus === "fulfilled") {
      alert("🎉 Registered successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-200 px-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white w-full max-w-md p-8 rounded-xl shadow-lg space-y-5'
      >
        <h2 className='text-3xl font-bold text-center text-blue-600'>
          Create an Account
        </h2>
        <p className='text-center text-sm text-gray-500'>
          Join FaziSimpleSavings and start tracking your goals.
        </p>

        {error && (
          <div className='alert alert-error text-sm px-4 py-2 rounded'>
            {error}
          </div>
        )}

        <div>
          <label className='label text-sm font-medium text-gray-700'>
            First Name
          </label>
          <input
            name='firstName'
            placeholder='John'
            className='input input-bordered w-full'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.firstName && errors.firstName && (
            <p className='text-red-500 text-sm'>{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className='label text-sm font-medium text-gray-700'>
            Last Name
          </label>
          <input
            name='lastName'
            placeholder='Doe'
            className='input input-bordered w-full'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.lastName && errors.lastName && (
            <p className='text-red-500 text-sm'>{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className='label text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            name='email'
            type='email'
            placeholder='you@example.com'
            className='input input-bordered w-full'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <p className='text-red-500 text-sm'>{errors.email}</p>
          )}
        </div>

        <div>
          <label className='label text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            name='password'
            type='password'
            placeholder='••••••••'
            className='input input-bordered w-full'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <p className='text-red-500 text-sm'>{errors.password}</p>
          )}
        </div>

        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={loading || Object.keys(errors).length > 0}
        >
          {loading ? (
            <span className='loading loading-spinner'></span>
          ) : (
            "Register"
          )}
        </button>

        <p className='text-sm text-center text-gray-600'>
          Already have an account?{" "}
          <Link
            to='/login'
            className='text-blue-600 hover:underline font-medium'
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
