import UserCard from "../../components/User/UserCard/UserCard";
import MyNotices from "../../components/Notices/MyNotices/MyNotices";
import s from "./ProfilePage.module.css";

const ProfilePage = () => {
    return (
        <section className={s.section}>
            <div className={s.container}>
                <UserCard />
                <MyNotices />
            </div>
        </section>
    );
};
export default ProfilePage;
