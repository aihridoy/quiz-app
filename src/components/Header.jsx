import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { auth, logout } = useAuth();
    return (
        <header className="flex justify-between items-center mb-2">
            <img src={logo} className="h-7" />
            <div>
                {!auth?.user && (
                    <Link
                        to="/login"
                        className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                        style={{ fontFamily: "Jaro" }}
                    >
                        Login
                    </Link>
                )}
                {
                    auth?.user?.role === 'admin' && (
                        <Link
                            to="/dashboard"
                            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                            style={{ fontFamily: "Jaro" }}
                        >
                            Dashboard
                        </Link>
                    )
                }
                {
                    auth?.user && (
                        <button
                            onClick={logout}
                            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                            style={{ fontFamily: "Jaro" }}
                        >
                            Logout
                        </button>
                    )
                }
            </div>
        </header>
    );
};

export default Header;
