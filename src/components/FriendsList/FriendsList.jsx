import FriendsItem from "../FriendsItem/FriendsItem";
import s from "./FriendsList.module.css";

const FriendsList = ({ items = [] }) => {
    if (!items.length) return <p>No results.</p>;

    return (
        <ul className={s.list}>
            {items.map(it => (
                <FriendsItem
                    key={it.id || it._id}
                    item={it}
                />
            ))}
        </ul>
    );
};

export default FriendsList;