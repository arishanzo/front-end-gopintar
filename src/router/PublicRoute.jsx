import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
    );

    // Jika sudah login, redirect ke dashboard
    if (user) return <Navigate to="/dashboard" />;

    // Jika belum login, tampilkan halaman public (login/register)
    return children;
};

export default PublicRoute;