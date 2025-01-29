/* eslint-disable react/no-unknown-property */
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationInputFields = () => {
    const { register, loading } = useAuth();
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        await register(full_name, email, password, isAdmin);
    };

    return (
        <div className="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
            <ToastContainer />
            <div className="w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
                    <span>Welcome to</span>
                    <img src={logo} className="h-7" />
                </h2>
                <h1 className="text-4xl font-bold mb-6">Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            placeholder="John Doe"
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="mb-6 w-full">
                            <label htmlFor="password" className="block mb-2">Enter your Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-6 w-full">
                            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-6 flex gap-2 items-center">
                        <input
                            type="checkbox"
                            id="admin"
                            className="px-4 py-3 rounded-lg border border-gray-300"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <label htmlFor="admin" className="block">Register as Admin</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg mb-2"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-2 text-gray-400">
                    <p className="text-center">
                        Already have an account? <Link to="/login" className="text-primary">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationInputFields;
