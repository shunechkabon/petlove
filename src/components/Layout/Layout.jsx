import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";
import { selectAuthRefreshing } from "../../redux/auth/slice";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import { selectIsLoading } from "../../redux/ui/slice";

const Layout = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const isAuthRefreshing = useSelector(selectAuthRefreshing);

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    if (isAuthRefreshing) return <Loader/>;

    return (
        <>
            <Toaster position="top-right" />

            <header>
                <Header />
            </header>

            {isLoading ? <Loader /> : null}

            <main id="main-content" role="main" className="container">
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};

export default Layout;