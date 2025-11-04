import PetsItem from "../PetsItem/PetsItem";
import s from "./PetsList.module.css";

const PetsList = ({ items = [] }) => {
    if (!items.length) return <p className={s.empty}>No pets added yet.</p>;

    return (
        <ul className={s.list} aria-label="Pets list">
            {items.map(it => (
                <PetsItem
                    key={it.id || it._id}
                    id={it.id || it._id}
                    title={it.title}
                    name={it.name}
                    birthday={it.birthday}
                    species={it.species}
                    sex={it.sex}
                    imgUrl={it.imgUrl}
                />
            ))}
        </ul>
    );
};

export default PetsList;

