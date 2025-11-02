import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/slice";
import { getCurrentFull } from "../../../api/users";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "../../Auth/LogOutBtn/LogOutBtn";
import ModalEditUser from "../../Modals/ModalEditUser/ModalEditUser";
import Icon from "../../Icon/Icon";
import s from "./UserCard.module.css";

const UserCard = () => {
    const shortUser = useSelector(selectUser);
    const [open, setOpen] = useState(false);
    const [initial, setInitial] = useState(null);
    const [loading, setLoading] = useState(false);

    const onEdit = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const full = await getCurrentFull();
            setInitial({
                avatar: full.avatar || "",
                name: full.name || "",
                email: full.email || "",
                phone: full.phone || "+380",
            });
        } catch {
            setInitial({
                avatar: shortUser?.avatar || "",
                name: shortUser?.name || "",
                email: shortUser?.email || "",
                phone: shortUser?.phone || "+380",
            });
        } finally {
            setLoading(false);
            setOpen(true);
        }
    };
    
    return (
        <div className={s.card}>
            <div className={s.top}>
                <div className={s.user}>
                    <span className={s.badge}>User</span>
                    <Icon className={s.icon} name="user" width={18} height={18}/>
                </div>
                <EditUserBtn loading={loading} onClick={onEdit} />
            </div>

            <UserBlock />
            <PetsBlock />
            <LogOutBtn />

            {open && initial && (
                <ModalEditUser initial={initial} onClose={() => setOpen(false)} />
            )}
        </div>
    );
};
export default UserCard;
