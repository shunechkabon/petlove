import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/slice";

const PublicRoute = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return isLoggedIn ? <Navigate to="/profile" replace /> : children;
};

export default PublicRoute;
