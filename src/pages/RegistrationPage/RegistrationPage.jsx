import { Link } from "react-router-dom";
import RegistrationForm from "../../components/Auth/RegistrationForm/RegistrationForm";
import PetBlock from "../../components/PetBlock/PetBlock";
import Title from "../../components/Title/Title";
import catImg from "../../assets/images/petblock-cat.png";
import emojiCat from "../../assets/images/emoji-cat.png";
import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
    return (
        <section>
            <div className={s.container}>
                <PetBlock
                    image={catImg}
                    alt="Cat"
                    icon={emojiCat}
                    name="Jack"
                    birthday="18.10.2021"
                    description="Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys."
                />
    
                <div className={s.formContainer}>
                    <div>
                        <Title>Registration</Title>
                        <p className={s.text}>Thank you for your interest in our platform.</p>
                    </div>
    
                    <RegistrationForm />
                    <span className={s.span}>
                        Already have an account?{" "}
                        <Link to="/login" className={s.link}>
                            Login
                        </Link>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default RegistrationPage;