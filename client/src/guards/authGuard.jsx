import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export default function AuthGuard(props) {
    const user = useAuth();

    if (!user.user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}