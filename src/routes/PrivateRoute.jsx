import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/slice";

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children;
};

export default PrivateRoute;
