import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPet } from "../../redux/pets/operations";
import s from "./AddPetForm.module.css";

const schema = Yup.object({
    title: Yup.string().required("Title is required"),
    name: Yup.string().required("Name is required"),
    imgUrl: Yup.string()
        .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i, "Provide a valid image URL")
        .required("Image URL is required"),
    species: Yup.string().required("Species is required"),
    birthday: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
        .required("Birthday is required"),
    sex: Yup.string().oneOf(["male", "female"]).required("Sex is required"),
});

const AddPetForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { sex: "male" }
    });

    const onSubmit = async (values) => {
        const res = await dispatch(createPet(values));
        if (res.meta.requestStatus === "fulfilled") {
            reset();
            navigate("/profile");
        }
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={s.sexGroup} aria-label="Sex">
                <label><input type="radio" value="male" {...register("sex")} /> Male</label>
                <label><input type="radio" value="female" {...register("sex")} /> Female</label>
            </fieldset>

            <input {...register("imgUrl")} placeholder="Image URL" />
            {errors.imgUrl && <p className={s.err}>{errors.imgUrl.message}</p>}

            <input {...register("title")} placeholder="Title" />
            {errors.title && <p className={s.err}>{errors.title.message}</p>}

            <input {...register("name")} placeholder="Name" />
            {errors.name && <p className={s.err}>{errors.name.message}</p>}

            <input {...register("birthday")} placeholder="YYYY-MM-DD" />
            {errors.birthday && <p className={s.err}>{errors.birthday.message}</p>}

            <input {...register("species")} placeholder="Species" />
            {errors.species && <p className={s.err}>{errors.species.message}</p>}

            <div className={s.actions}>
                <button type="button" onClick={() => navigate("/profile")}>Back</button>
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </div>
        </form>
    );
};

export default AddPetForm;
