/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.svg";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const LoginInputFields = () => {
    const { login, loading } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password, isAdmin);
    };

    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
                    <span>Welcome to</span>
                    <img src={logo} className="h-7" alt="logo" />
                </h2>
                <h1 className="text-5xl font-bold mb-8">Sign in</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">
                            Enter your username or email address
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            placeholder="Username or email address"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2">
                            Enter your Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 flex gap-2 items-center">
                        <input
                            type="checkbox"
                            id="admin"
                            className="px-4 py-3 rounded-lg border border-gray-300"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <label htmlFor="admin" className="block">
                            Login as Admin
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg mb-4"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="text-center">
                    <a href="#" className="text-primary">
                        Forgot Password
                    </a>
                </div>

                <div className="mt-8">
                    <p className="text-center">
                        No Account? <Link to="/registration" className="text-primary">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginInputFields;
