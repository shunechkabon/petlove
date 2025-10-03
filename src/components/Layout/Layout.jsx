import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import { selectIsLoading } from "../../redux/ui/slice";

const Layout = () => {
    const isLoading = useSelector(selectIsLoading);

    return (
        <>
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