import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectAuthRefreshing } from "../redux/auth/slice";

const PublicRoute = ({ children, redirectTo = "/profile" }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isRefreshing = useSelector(selectAuthRefreshing);

    if (isRefreshing) return null;

    return isLoggedIn ? <Navigate to={redirectTo} replace /> : children;
};

export default PublicRoute;
