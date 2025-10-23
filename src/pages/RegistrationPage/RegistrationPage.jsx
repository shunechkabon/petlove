import { Link } from "react-router-dom";
import RegistrationForm from "../../components/Auth/RegistrationForm/RegistrationForm";
import PetBlock from "../../components/PetBlock/PetBlock";
import Title from "../../components/Title/Title";
import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
    return (
        <div>
            <PetBlock />

            <div>
                <div>
                    <Title>Registration</Title>
                    <p>Thank you for your interest in our platform.</p>
                </div>

                <RegistrationForm />
                <span>
                    Already have an account?{" "}
                    <Link to="/login" className={s.link}>
                        Login
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default RegistrationPage;