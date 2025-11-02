import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/slice";
import s from "./UserBlock.module.css";

const UserBlock = () => {
    const user = useSelector(selectUser);
    return (
        <div className={s.block}>
            <div className={s.header}>
                <img
                    className={s.avatar}
                    src={user?.avatar}
                    alt="avatar"
                />
                <div className={s.info}>
                    <h3 className={s.name}>{user?.name || "User"}</h3>
                    <p className={s.email}>{user?.email}</p>
                    {user?.phone && <p className={s.phone}>{user.phone}</p>}
                </div>
            </div>
        </div>
    );
};

export default UserBlock;