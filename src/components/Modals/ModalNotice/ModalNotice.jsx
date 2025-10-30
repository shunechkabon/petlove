import Modal from "../../Modals/Modal";
import Icon from "../../Icon/Icon";
import Rating from "../../Rating/Rating";
import s from "./ModalNotice.module.css";

const formatDate = (iso) =>
    iso ? new Date(iso)
            .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
            .replaceAll("/", ".")
        : "—";

const ModalNotice = ({
    open,
    item,
    isFavorite, 
    onToggleFavorite,
    onClose, 
}) => {
    if (!open || !item) return null;

    const id = item._id || item.id;
    const birthday = formatDate(item.birthday);
    const ownerEmail = item.user?.email;
    const ownerPhone = item.user?.phone;

    const contactHref = ownerEmail
        ? `mailto:${ownerEmail}`
        : ownerPhone
            ? `tel:${ownerPhone.replace(/[^\d+]/g, "")}`
            : null;

    return (
        <Modal isOpen={open} onClose={onClose} ariaLabel="Notice details" className={s.modal}>
            <div className={s.container}>
                <div className={s.imgContainer}>
                    <span className={s.badge}>{item.category}</span>
                    <img className={s.img} src={item.imgURL} alt={item.title || item.name || "Pet"} />
                </div>
    
                <h3 className={s.title}>{item.title}</h3>
    
                <Rating value={item.popularity ?? 0} className={s.rate} />
    
                <ul className={s.features}>
                    <li className={s.featureItem}>
                        <p className={s.featureName}>Name</p>
                        <p className={s.featureValue}>{item.name}</p>
                    </li>
                    <li className={s.featureItem}>
                        <p className={s.featureName}>Birthday</p>
                        <p className={s.featureValue}>{birthday}</p>
                    </li>
                    <li className={s.featureItem}>
                        <p className={s.featureName}>Sex</p>
                        <p className={s.featureValue}>{item.sex}</p>
                    </li>
                    <li className={s.featureItem}>
                        <p className={s.featureName}>Species</p>
                        <p className={s.featureValue}>{item.species}</p>
                    </li>
                </ul>
    
                {item.comment && <p className={s.text}>{item.comment}</p>}
    
                <p className={s.price}>{item.price ? `$${item.price}` : "Free"}</p>
    
                <div className={s.actions}>
                    <button type="button" className={`${s.btnFav} ${s.btn}`} onClick={() => onToggleFavorite?.(id)}>
                        {isFavorite ? "Remove from" : "Add to"} <Icon name="heart" width={18} height={18} />
                    </button>
    
                    {contactHref ? (
                        <a className={`${s.btnContact} ${s.btn}`} href={contactHref}>Contact</a>
                    ) : (
                        <button className={`${s.btn} ${s.btnContact} ${s.disabled}`} type="button" disabled>Contact</button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ModalNotice;
