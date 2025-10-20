import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends, selectFriends } from "../../redux/friends/slice";
import Title from "../../components/Title/Title";
import FriendsList from "../../components/FriendsList/FriendsList";
import s from "./OurFriendsPage.module.css";

const OurFriendsPage = () => {
    const dispatch = useDispatch();
    const { items, isLoading, error } = useSelector(selectFriends);

    useEffect(() => {
        dispatch(fetchFriends());
    }, [dispatch]);

    return (
        <section>
            <div className={s.container}>
                <Title className={s.title}>Our friends</Title>
    
                {error && <p role="alert">Error: {error}</p>}
                {!isLoading && !error && <FriendsList items={items} />}
            </div>
        </section>
    );
};

export default OurFriendsPage;