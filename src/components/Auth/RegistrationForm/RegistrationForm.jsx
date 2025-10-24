import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register as registerThunk } from "../../../redux/auth/operations";
import { selectAuthLoading, selectAuthError } from "../../../redux/auth/slice";
import Icon from "../../Icon/Icon";
import s from "./RegistrationForm.module.css";

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const schema = Yup.object({
    name: Yup.string().trim()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    email: Yup.string().trim()
        .matches(emailRegex, "Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(7, "Password must be at least 7 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm your password"),
});

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const onSubmit = async ({ name, email, password }) => {
        const payload = { name: name.trim(), email: email.trim(), password };
        const res = await dispatch(registerThunk(payload)).unwrap().catch(() => null);
        if (res) {
            toast.success("Welcome to PetLove!");
            navigate("/profile");
        }
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className={s.label} htmlFor="name">
                <input
                    id="name"
                    className={s.input}
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                />
                {errors.name && <span className={s.error}>{errors.name.message}</span>}
            </label>

            <label className={s.label} htmlFor="email">
                <input
                    id="email"
                    className={s.input}
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    inputMode="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
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
                        autoComplete="new-password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "password-error" : undefined}
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

            <label className={s.label} htmlFor="confirmPassword">
                <div className={s.passwordWrap}>
                    <input
                        id="confirmPassword"
                        className={s.input}
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        {...register("confirmPassword")}
                    />
                    <button
                        type="button"
                        className={s.eyeBtn}
                        onClick={() => setShowConfirm((prev) => !prev)}
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                        aria-pressed={showConfirm}
                    >
                        <Icon
                            name={showConfirm ? "eye-off" : "eye"}
                            width={22}
                            height={22}
                        />
                    </button>
                </div>
                {errors.confirmPassword && <span className={s.error}>{errors.confirmPassword.message}</span>}
            </label>

            <button className={s.submit} type="submit" disabled={isSubmitting || isLoading}>
                REGISTRATION
            </button>
        </form>
    );
};

export default RegistrationForm;
