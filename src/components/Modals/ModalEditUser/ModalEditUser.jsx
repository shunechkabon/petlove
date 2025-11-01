import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateUser } from "../../../redux/auth/operations";
import { selectUser } from "../../../redux/auth/slice";
import Modal from "../Modal";
import Icon from "../../Icon/Icon";
import s from "./ModalEditUser.module.css";

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const avatarRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/;
const phoneRegex = /^\+38\d{10}$/;

const optional = (s) =>
    s.transform((v, orig) => (typeof orig === "string" && orig.trim() === "" ? undefined : v))
        .notRequired();

const schema = Yup.object({
    avatar: optional(
        Yup.string()
            .trim()
            .url("Must be a valid URL")
            .matches(avatarRegex, "URL must end with image extension")
    ),
    name: optional(
        Yup.string()
            .trim()
            .min(3, "Name must be at least 3 characters")
            .notRequired()
    ),
    email: optional(
        Yup.string()
            .trim()
            .matches(emailRegex, "Invalid email format")
            .notRequired(),
    ),
    phone: optional(
        Yup.string()
            .trim()
            .matches(phoneRegex, "Phone must start with +38 and contain digits only")
            .notRequired(),
    ),
});

const ModalEditUser = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [confirmedUrl, setConfirmedUrl] = useState(user?.avatar || "");
    const [showPreview, setShowPreview] = useState(Boolean(user?.avatar));

    const {
        register,
        handleSubmit,
        setFocus,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            avatar: user?.avatar || "",
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "+380",
        },
    });

    const avatarURL = watch("avatar");
    const candidate = useMemo(() => avatarURL?.trim() || "", [avatarURL]);

    const handleUploadClick = () => {
        const next = candidate?.trim();
        if (!next) {
            setConfirmedUrl("");
            setShowPreview(false);
            setFocus("avatar");
            return;
        }
        setConfirmedUrl(next);              
        setShowPreview(true);
    };

    const handleImgError = () => {
        setShowPreview(false);
        toast.error("Image URL is not accessible");
    };

    const same = (a = "", b = "") => a.trim() === b.trim();

    const isOnlyAvatarCleared = (formData, user) => {
        const clearedAvatar = !formData.avatar?.trim() && !!user?.avatar;
        const sameName = same(formData.name, user?.name);
        const sameEmail = same(formData.email, user?.email);
        const samePhone = same(formData.phone, user?.phone?.replace(/\s+/g, ""));
        return clearedAvatar && sameName && sameEmail && samePhone;
    };

    const buildPayload = (data, user) => {
        const norm = (k, v) => (k === "phone" ? v.replace(/\s+/g, "") : v);
        const entries = Object.entries(data).map(([k, v]) => [
            k,
            typeof v === "string" ? v.trim() : v,
        ]);

        const out = {};
        const fieldAvatar = entries.find(([k]) => k === "avatar")?.[1] ?? "";
        const prev = user?.avatar || "";

        if (fieldAvatar && fieldAvatar !== prev) {
            out.avatar = fieldAvatar;
        } 

        for (const [k, v] of entries) {
            if (k === "avatar") continue;
            if (v === "" || v == null) continue;      
            const nv = norm(k, v);
            if (nv !== (user?.[k] ?? "")) out[k] = nv; 
        }
        return out;
    };

    const onSubmit = async (formData) => {
        const payload = buildPayload(formData, user);
        if (Object.keys(payload).length === 0 && isOnlyAvatarCleared(formData, user)) {
            // локально скрываем превью, закрываем модалку, уходим на профиль
            setConfirmedUrl("");
            setShowPreview(false);
            toast.success("Profile updated locally");
            onClose();
            navigate("/profile");
            return;
        }
        if (Object.keys(payload).length === 0) {
            toast("Nothing to update");
            onClose();
            return;
        }
        try {
            await dispatch(updateUser(payload)).unwrap();
            toast.success("Profile updated successfully");
            onClose();
            navigate("/profile");
        } catch (err) {
            toast.error(err || "Update failed");
            onClose();
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} ariaLabel="Edit user info">
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <h2 className={s.title}>Edit information</h2>

                {/* Avatar */}
                <div className={s.hero}>
                    {showPreview && confirmedUrl ? (
                        <img
                            src={confirmedUrl}
                            alt="Avatar preview"
                            className={s.avatar}
                            onError={handleImgError}
                        />
                    ) : (
                        <div>
                            <Icon className={s.iconUser} name="user" width={34} height={34} />
                        </div>
                    )}
                </div>

                <div className={s.row}>
                    <label className={s.label}>
                        <input
                            type="url"
                            placeholder="https://..."
                            {...register("avatar")}
                            className={`${s.input} ${s.link}`}
                        />
                        {errors.avatar && <span className={s.error}>{errors.avatar.message}</span>}
                    </label>

                    <button type="button" className={s.uploadBtn} onClick={handleUploadClick}>
                        Upload photo <Icon name="upload" width={18} height={18} className={s.uploadIcon} />
                    </button>
                </div>

                {/* Inputs */}
                <div className={s.inputs}>
                    <label className={s.label}>
                        <input type="text" placeholder="Name" {...register("name")} className={s.input} />
                        {errors.name && <span className={s.error}>{errors.name.message}</span>}
                    </label>
    
                    <label className={s.label}>
                        <input type="email" placeholder="email@gmail.com" {...register("email")} className={s.input} />
                        {errors.email && <span className={s.error}>{errors.email.message}</span>}
                    </label>
    
                    <label className={s.label}>
                        <input type="tel" {...register("phone")} className={s.input} />
                        {errors.phone && <span className={s.error}>{errors.phone.message}</span>}
                    </label>
                </div>

                <button type="submit" className={s.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Go to profile"}
                </button>
            </form>
        </Modal>
    );
};

export default ModalEditUser;