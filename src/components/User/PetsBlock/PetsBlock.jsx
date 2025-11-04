import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../../../redux/pets/operations";
import { selectPets } from "../../../redux/pets/slice";
import AddPet from "../AddPet/AddPet";
import PetsList from "../PetsList/PetsList";
import s from "./PetsBlock.module.css";

const PetsBlock = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectPets);

    useEffect(() => { dispatch(fetchPets()); }, [dispatch]);
    
    return (
        <div className={s.block}>
            <div className={s.top}>
                <h3 className={s.title}>My pets</h3>
                <AddPet/>
            </div>

            <PetsList items={items} />
        </div>
    );
};

export default PetsBlock;