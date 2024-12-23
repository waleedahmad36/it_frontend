import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Hook for the mutation
import { useLoginUserMutation } from "../features/api/authApi";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [loginUser ] = useLoginUserMutation();  // Hook for login mutation
  const navigate = useNavigate();  // For redirecting

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    setLoading(true)

    try {

      const result = await loginUser(formData).unwrap();
      setLoading(false);
      setSuccess("Login successful! Redirecting...");
      navigate("/");  // Redirect to homepage after successful login
      setFormData({ email: "", password: "" });
    } catch (err) {
      console.log('error is', err)
      setLoading(false);
      toast.error(err.data.message || 'Something went wrong')
      // setError(err.data.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form
        className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <Link to="/signup">Don't have an account? Signup</Link>
    </div>
  );
};

export default Login;
