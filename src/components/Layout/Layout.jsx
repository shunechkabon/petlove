import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";

const Layout = () => {
    return (
        <>
            <Header />
            <Loader /> 
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;