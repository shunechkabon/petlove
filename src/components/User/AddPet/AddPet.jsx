import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/auth/slice";
import Icon from "../../Icon/Icon";
import s from "./AddPet.module.css";

const AddPet = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <>
            {isLoggedIn &&
                <Link to="/add-pet" className={s.link}>
                    <p className={s.text}>Add pet</p>
                    <Icon className={s.icon} name="plus" width={18} height={18}/>
                </Link>
            }
        </>
    );
};

export default AddPet;