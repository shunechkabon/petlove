import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as loginThunk } from "../../../redux/auth/operations";
import { selectAuthLoading, selectAuthError } from "../../../redux/auth/slice";
import Icon from "../../Icon/Icon";
import s from "./LoginForm.module.css";

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const schema = Yup.object({
    email: Yup.string().trim()
        .matches(emailRegex, "Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(7, "Password must be at least 7 characters")
        .required("Password is required"),
});

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { email: "", password: "" },
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const onSubmit = async ({ email, password }) => {
        const payload = { email: email.trim(), password };
        const res = await dispatch(loginThunk(payload)).unwrap().catch(() => null);
        if (res) {
            toast.success("Welcome back!");
            navigate("/profile");
        }
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className={s.label} htmlFor="email">
                <input
                    id="email"
                    className={s.input}
                    type="email"
                    autoComplete="username"
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    inputMode="email"
                    {...register("email")}
                />
                {errors.email && <span className={s.error}>{errors.email.message}</span>}
            </label>

            <label className={s.label} htmlFor="password">
                <div className={s.passwordWrap}>
                    <input
                        id="password"
                        className={s.input}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="current-password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        {...register("password")}
                    />
                    <button
                        type="button"
                        className={s.eyeBtn}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                    >
                        <Icon
                            name={showPassword ? "eye-off" : "eye"}
                            width={22}
                            height={22}
                        />
                    </button>
                </div>
                {errors.password && <span className={s.error}>{errors.password.message}</span>}
            </label>

            <button
                className={s.submit}
                type="submit"
                disabled={isSubmitting || isLoading}
                aria-busy={isSubmitting || isLoading}
            >
                LOG IN
            </button>
        </form>
    );
};

export default LoginForm;
