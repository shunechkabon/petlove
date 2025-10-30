import EditUserBtn from "../EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "../../Auth/LogOutBtn/LogOutBtn";
import s from "./UserCard.module.css";

const UserCard = () => {
    return (
        <div className={s.card}>
            <div>
                <span className={s.badge}>User</span>
                <EditUserBtn />
            </div>

            <UserBlock />

            <PetsBlock />

            <LogOutBtn />
        </div>
    );
};
export default UserCard;
