import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn, selectAuthRefreshing } from "../redux/auth/slice";

const PublicRoute = ({ children, redirectTo = "/profile" }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isRefreshing = useSelector(selectAuthRefreshing);
    const location = useLocation();

    if (isRefreshing) return null;

    const from = location.state?.from;
    const target = from ? from : redirectTo;

    return isLoggedIn ? <Navigate to={target} replace /> : children;
};

export default PublicRoute;
