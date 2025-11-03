import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsLoggedIn } from "../../../redux/auth/slice";
import { fetchUserFull } from "../../../redux/auth/operations";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "../../Auth/LogOutBtn/LogOutBtn";
import ModalEditUser from "../../Modals/ModalEditUser/ModalEditUser";
import Icon from "../../Icon/Icon";
import s from "./UserCard.module.css";

const UserCard = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);

    const [open, setOpen] = useState(false);
    const [initial, setInitial] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) return;
        if (user?.phone && (user?.avatar || user?.avatarURL)) return;
        dispatch(fetchUserFull());
    }, [isLoggedIn, user?.phone, user?.avatar, user?.avatarURL, dispatch]);

    const onEdit = async () => {
        if (loading) return;
        setLoading(true);
        const full = user || {};
        setInitial({
            avatar: full.avatar || "",
            name: full.name || "",
            email: full.email || "",
            phone: full.phone || "+380",
        });
        setLoading(false);
        setOpen(true);
    };
    
    return (
        <div className={s.card}>
            <div className={s.top}>
                <div className={s.user}>
                    <span className={s.badge}>User</span>
                    <Icon className={s.icon} name="user" width={18} height={18}/>
                </div>
                <EditUserBtn className={s.editBtn} loading={loading} onClick={onEdit} />
            </div>

            <UserBlock onUploadPhoto={onEdit} />
            <PetsBlock />
            <LogOutBtn />

            {open && initial && (
                <ModalEditUser initial={initial} onClose={() => setOpen(false)} />
            )}
        </div>
    );
};
export default UserCard;
