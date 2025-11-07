import { useDispatch } from "react-redux";
import { removePet } from "../../../redux/pets/operations";
import Icon from "../../Icon/Icon";
import s from "./PetsItem.module.css";

const PetsItem = ({ id, title, name, birthday, species, sex, imgURL }) => {
    const dispatch = useDispatch();
    const onDelete = () => dispatch(removePet(id));
    
    return (
        <li className={s.card}>
            <img
                className={s.img}
                src={imgURL}
                alt={title || name}
                onError={(e) => { e.currentTarget.src = "/fallback-pet.png"; }}
            />
            <div className={s.info}>
                <h4 className={s.petTitle}>{title}</h4>
                <ul className={s.features}>
                    <li className={s.featureItem}>
                        <span className={s.featureName}>Name</span>
                        <span className={s.featureValue}>{name}</span>
                    </li>
                    <li className={s.featureItem}>
                        <span className={s.featureName}>Birthday</span>
                        <span className={s.featureValue}>{birthday}</span>
                    </li>
                    <li className={s.featureItem}>
                        <span className={s.featureName}>Species</span>
                        <span className={s.featureValue}>{species}</span>
                    </li>
                    <li className={s.featureItem}>
                        <span className={s.featureName}>Sex</span>
                        <span className={s.featureValue}>{sex}</span>
                    </li>
                </ul>
            </div>
            <button type="button" className={s.trashBtn} aria-label="Delete pet" onClick={onDelete}>
                <Icon className={s.trashIcon} name="trash" width={16} height={16} />
            </button>
        </li>
    );
};

export default PetsItem;