import { useMemo, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createPet } from "../../redux/pets/operations";
import {
    fetchSpecies,
    selectSpeciesDict,
    selectDictLoaded,
} from "../../redux/dictionaries/slice";
import Icon from "../Icon/Icon";
import s from "./AddPetForm.module.css";

const schema = Yup.object({
    title: Yup.string()
        .required("Title is required"),
    name: Yup.string()
        .required("Name is required"),
    imgURL: Yup.string()
        .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i, "Provide a valid image URL")
        .required("Image URL is required"),
    species: Yup.string()
        .required("Species is required"),
    birthday: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
        .required("Birthday is required"),
    sex: Yup.string()
        .oneOf(["male", "female", "multiple", "unknown"])
        .required("Sex is required"),
});

const AddPetForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const speciesDict = useSelector(selectSpeciesDict);
    const loaded = useSelector(selectDictLoaded);

    useEffect(() => {
        if (!loaded.species) dispatch(fetchSpecies());
    }, [loaded.species, dispatch]);

    const speciesOptions = useMemo(
        () => speciesDict.map((t) => ({ value: t, label: t })),
        [speciesDict]
    );
    const findOpt = (val) => speciesOptions.find((o) => o.value === val) ?? null;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        control
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            sex: "unknown",
            species: "",
            title: "",
            name: "",
            imgURL: "",
            birthday: "",
        },
        mode: "onTouched",
    });

    const selectedSex = watch("sex");
    const [previewUrl, setPreviewUrl] = useState("");
    const candidate = (watch("imgURL") || "").trim();

    const onUploadClick = () => {
        if (!candidate) {
            setPreviewUrl("");
            return toast.error("Enter image URL first");
        }
        const ok = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i.test(candidate);
        if (!ok) {
            setPreviewUrl("");
            return toast.error("Provide a valid image URL");
        }
        setPreviewUrl(candidate);
    };

    const handleImgError = () => {
        setPreviewUrl("");
        toast.error("Image URL is not accessible");
    };

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            sex: values.sex || "unknown",
            birthday: new Date(values.birthday).toISOString().slice(0, 10)
        };
        console.log("ADD PET payload →", payload);

        try {
            await dispatch(createPet(payload)).unwrap();
            toast.success("Pet added successfully!");
            reset();
            navigate("/profile");
        } catch {
            toast.error("Server error while adding pet.");
        }
    };

    const onError = (formErrors) => {
        const first = Object.values(formErrors)[0];
        toast.error(first?.message || "Please fix the errors in the form.");
    };

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            {/* Sex */}
            <div>
                <fieldset className={s.sexGroup} aria-label="Sex">
                    <label className={`${s.radio} ${selectedSex === "female" ? s.active : ""}`}>
                        <input type="radio" value="female" {...register("sex")} />
                        <Icon name="female" width={20} height={20} />
                    </label>
                    <label className={`${s.radio} ${selectedSex === "male" ? s.active : ""}`}>
                        <input type="radio" value="male" {...register("sex")} />
                        <Icon name="male" width={20} height={20} />
                    </label>
                    <label className={`${s.radio} ${selectedSex === "multiple" ? s.active : ""}`}>
                        <input type="radio" value="multiple" {...register("sex")} />
                        <Icon name="group" width={20} height={20} />
                    </label>
                </fieldset>
                {errors.sex && <p className={s.err}>{errors.sex.message}</p>}
            </div>

            {/* Avatar */}
            <div className={s.avatarRow}>
                <div className={s.avatarWrap}>
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Pet preview"
                            className={s.avatar}
                            onError={handleImgError}
                        />
                    ) : (
                        <div className={s.avatarPlaceholder}>
                            <Icon name="paw" width={34} height={34} />
                        </div>
                    )}
                </div>

                <div className={s.avatarControls}>
                    <label>
                        <input
                            {...register("imgURL")}
                            placeholder="Enter URL"
                            className={`${s.input} ${s.link}`}
                        />
                        {errors.imgURL && <p className={s.err}>{errors.imgURL.message}</p>}
                    </label>

                    <button type="button" className={s.uploadBtn} onClick={onUploadClick}>
                        Upload photo
                        <Icon name="upload" width={18} height={18} className={s.uploadIcon} />
                    </button>
                </div>
            </div>

            {/* Title */}
            <label>
                <input {...register("title")} placeholder="Title" />
                {errors.title && <p className={s.err}>{errors.title.message}</p>}
            </label>

            {/* Name */}
            <label>
                <input {...register("name")} placeholder="Pet's Name" />
                {errors.name && <p className={s.err}>{errors.name.message}</p>}
            </label>

            {/* Birthday */}
            <label>
                <input
                    type="date"
                    max={new Date().toISOString().slice(0, 10)}
                    {...register("birthday")}
                    className={s.input}
                />
                {errors.birthday && <p className={s.err}>{errors.birthday.message}</p>}
            </label>

            {/* Species */}
            <div className={s.selectWrap}>
                <Controller
                    name="species"
                    control={control}
                    render={({ field }) => (
                        <Select
                            className={`${s.rs}`}
                            classNamePrefix="rs"
                            options={speciesOptions}
                            value={findOpt(field.value)}
                            onChange={(opt) => field.onChange(opt?.value ?? "")}
                            isSearchable={false}
                            placeholder="By type"
                        />
                    )}
                />
                {errors.species && <p className={s.err}>{errors.species.message}</p>}
            </div>

            <div className={s.actions}>
                <button type="button" onClick={() => navigate("/profile")}>Back</button>
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </div>
        </form>
    );
};

export default AddPetForm;
