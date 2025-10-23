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
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    email: Yup.string()
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
            <label className={s.label}>
                <input
                    className={s.input}
                    type="text"
                    placeholder="Name"
                    {...register("name")}
                />
                {errors.name && <span className={s.error}>{errors.name.message}</span>}
            </label>

            <label className={s.label}>
                <input
                    className={s.input}
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />
                {errors.email && <span className={s.error}>{errors.email.message}</span>}
            </label>

            <label className={s.label}>
                <div className={s.passwordWrap}>
                    <input
                        className={s.input}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password")}
                    />
                    <button
                        type="button"
                        className={s.eyeBtn}
                        onClick={() => setShowPassword((prev) => !prev)}
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

            <label className={s.label}>
                <div className={s.passwordWrap}>
                    <input
                        className={s.input}
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm password"
                        {...register("confirmPassword")}
                    />
                    <button
                        type="button"
                        className={s.eyeBtn}
                        onClick={() => setShowConfirm((prev) => !prev)}
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
