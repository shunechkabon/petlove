import { Link } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import PetBlock from "../../components/PetBlock/PetBlock";
import Title from "../../components/Title/Title";
import dogImg from "../../assets/images/petblock-dog.png";
import emojiDog from "../../assets/images/emoji-dog.png";
import s from "./LoginPage.module.css";

const LoginPage = () => {
    return (
        <section>
            <div className={s.container}>
                <PetBlock
                    image={dogImg}
                    imgClassName={s.dogImg}
                    alt="Dog"
                    icon={emojiDog}
                    name="Rich"
                    birthday="21.09.2020"
                    description="Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!"
                />
    
                <div className={s.formContainer}>
                    <div>
                        <Title>Log in</Title>
                        <p className={s.text}>Welcome! Please enter your credentials to login to the platform:</p>
                    </div>
    
                    <LoginForm />
                    <span className={s.span}>
                        Don`t have an account?{" "}
                        <Link to="/register" className={s.link}>
                            Register
                        </Link>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;