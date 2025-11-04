import { useDispatch } from "react-redux";
import { removePet } from "../../../redux/pets/operations";
import Icon from "../../Icon/Icon";
import s from "./PetsItem.module.css";

const PetsItem = ({ id, title, name, birthday, species, sex, imgUrl }) => {
    const dispatch = useDispatch();
    const onDelete = () => dispatch(removePet(id));
    
    return (
        <li className={s.card}>
            <img
                className={s.img}
                src={imgUrl}
                alt={title || name}
                onError={(e) => { e.currentTarget.src = "/fallback-pet.png"; }}
            />
            <div className={s.info}>
                <h4 className={s.petTitle}>{title}</h4>
                <ul className={s.meta}>
                    <li><span>Name:</span> {name}</li>
                    <li><span>Birthday:</span> {birthday}</li>
                    <li><span>Species:</span> {species}</li>
                    <li><span>Sex:</span> {sex}</li>
                </ul>
            </div>
            <button type="button" className={s.trashBtn} aria-label="Delete pet" onClick={onDelete}>
                <Icon name="trash" width={20} height={20} />
            </button>
        </li>
    );
};

export default PetsItem;