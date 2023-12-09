import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export default function AuthGuard(props) {
    const user = useAuth();
    console.log(user);
    if (!user.user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}