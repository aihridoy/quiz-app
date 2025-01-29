/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, isAdmin: false, tokens: null });
    const [loading, setLoading] = useState(false);
    const [loggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    let isRefreshing = false;
    let failedQueue = [];

    useEffect(() => {
        const savedAuth = JSON.parse(localStorage.getItem("auth"));
        if (savedAuth) {
            setAuth(savedAuth);
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    const login = async (username, password, isAdmin) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: username,
                password,
            });
            const { tokens, user } = response.data.data;
            const isAdminUser = isAdmin && user?.role === "admin";
            setAuth({
                user,
                isAdmin: isAdminUser,
                tokens,
            });
            setIsLoggedIn(true);
            toast.success("Logged in successfully!");
            setTimeout(() => {
                navigate("/");
            }, 1000);
            setError(null);
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed");
            toast.error(err?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const register = async (full_name, email, password) => {
        setLoading(true);
        try {
            await axiosInstance.post("/auth/register", {
                full_name,
                email,
                password,
            });
            toast.success("Signed In successfully!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
            setError(null);
        } catch (err) {
            setError(err?.response?.data?.message || "Registration failed");
            toast.error(err?.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const refreshToken = async () => {
        try {
            const response = await axiosInstance.post("/auth/refresh-token", {
                refreshToken: auth.tokens?.refreshToken,
            });
            const { accessToken } = response.data.data;
            setAuth((prevAuth) => ({
                ...prevAuth,
                tokens: {
                    ...prevAuth.tokens,
                    accessToken,
                },
            }));
            return accessToken;
        } catch (err) {
            logout();
            throw err;
        }
    };

    const logout = () => {
        setAuth({ user: null, isAdmin: false, tokens: null });
        setIsLoggedIn(false);
        localStorage.removeItem("auth");
    };

    const processQueue = (error, token = null) => {
        failedQueue.forEach((promise) => {
            if (error) {
                promise.reject(error);
            } else {
                promise.resolve(token);
            }
        });
        failedQueue = [];
    };

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    auth.tokens?.refreshToken
                ) {
                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            failedQueue.push({ resolve, reject });
                        })
                            .then((token) => {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                                return axiosInstance(originalRequest);
                            })
                            .catch((err) => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;

                    try {
                        const newAccessToken = await refreshToken();
                        processQueue(null, newAccessToken);
                        isRefreshing = false;
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axiosInstance(originalRequest);
                    } catch (err) {
                        processQueue(err, null);
                        isRefreshing = false;
                        return Promise.reject(err);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, [auth.tokens, refreshToken]);

    return (
        <AuthContext.Provider value={{ auth, login, register, logout, loading, error, loggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
