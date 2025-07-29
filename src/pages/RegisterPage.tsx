import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      // success toast
      alert("Registered successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 shadow-lg bg-white rounded'>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>

      {error && <div className='text-red-500 mb-2'>{error}</div>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <input
            name='firstName'
            placeholder='First Name'
            className='input input-bordered w-full'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.firstName && errors.firstName && (
            <p className='text-red-500 text-sm'>{errors.firstName}</p>
          )}
        </div>

        <div>
          <input
            name='lastName'
            placeholder='Last Name'
            className='input input-bordered w-full'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.lastName && errors.lastName && (
            <p className='text-red-500 text-sm'>{errors.lastName}</p>
          )}
        </div>

        <div>
          <input
            name='email'
            type='email'
            placeholder='Email'
            className='input input-bordered w-full'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <p className='text-red-500 text-sm'>{errors.email}</p>
          )}
        </div>

        <div>
          <input
            name='password'
            type='password'
            placeholder='Password'
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
      </form>

      <p className='text-sm text-center mt-4'>
        Already have an account?{" "}
        <a href='/login' className='text-blue-600 hover:underline'>
          Login here
        </a>
      </p>
    </div>
  );
}
