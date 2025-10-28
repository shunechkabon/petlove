import { Link } from "react-router-dom";
import s from "./PetsBlock.module.css";

const PetsBlock = () => {
    return (
        <div>
            <p className={s.title}>My pets</p>
            <Link to="/add-pet" className={s.addPetBtn}>Add pet +</Link>
            <ul aria-label="Pets list">{/* <PetsItem .../> */}</ul>
        </div>
    );
};

export default PetsBlock;