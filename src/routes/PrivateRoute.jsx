import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn, selectAuthRefreshing } from "../redux/auth/slice";

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isRefreshing = useSelector(selectAuthRefreshing);
    const location = useLocation();

    if (isRefreshing) return null;

    return isLoggedIn
        ? children
        : <Navigate to={redirectTo} replace state={{ from: location }} />;
};

export default PrivateRoute;
