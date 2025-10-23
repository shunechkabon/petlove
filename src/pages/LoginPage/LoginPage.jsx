import { Link } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import PetBlock from "../../components/PetBlock/PetBlock";
import Title from "../../components/Title/Title";
import s from "./LoginPage.module.css";

const LoginPage = () => {
    return (
        <div>
            <PetBlock />

            <div>
                <div>
                    <Title>Log in</Title>
                    <p>Welcome! Please enter your credentials to login to the platform:</p>
                </div>

                <LoginForm />
                
                <span>
                    Don`t have an account?{" "}
                    <Link to="/register" className={s.link}>
                        Register
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default LoginPage;