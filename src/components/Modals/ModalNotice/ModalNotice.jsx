import Modal from "../../Modals/Modal";
import Icon from "../../Icon/Icon";
import s from "./ModalNotice.module.css";

const formatDate = (iso) =>
  iso
    ? new Date(iso)
        .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
        .replaceAll("/", ".")
    : "—";

const ModalNotice = ({
  open,
  item,                 // объект карточки
  isFavorite,           // boolean
  onToggleFavorite,     // (id) => void
  onClose,              // () => void
}) => {
  if (!open || !item) return null;

  const id = item._id || item.id;
  const birthday = formatDate(item.birthday);

  // Contact: пытаемся сначала email, иначе phone; если ничего нет — делаем disabled-кнопку
  const contactHref = item.contactEmail
    ? `mailto:${item.contactEmail}`
    : item.contactPhone
    ? `tel:${item.contactPhone}`
    : null;

  return (
    <Modal isOpen={open} onClose={onClose} ariaLabel="Notice details" className={s.modal}>
      <span className={s.badge}>{item.category}</span>

      <img className={s.img} src={item.imgURL} alt={item.title || item.name || "Pet"} />

      <h3 className={s.title}>{item.title}</h3>

      <div className={s.rate}>
        <Icon name="star" className={s.star} width={18} height={18} />
        <span>{item.popularity ?? 0}</span>
      </div>

      <ul className={s.features}>
        <li><span>Name</span><span>{item.name}</span></li>
        <li><span>Birthday</span><span>{birthday}</span></li>
        <li><span>Sex</span><span>{item.sex}</span></li>
        <li><span>Species</span><span>{item.species}</span></li>
      </ul>

      {item.comment && <p className={s.text}>{item.comment}</p>}

      <p className={s.price}>{item.price ? `$${item.price}` : "Free"}</p>

      <div className={s.actions}>
        <button type="button" className={s.btnPrimary} onClick={() => onToggleFavorite?.(id)}>
          {isFavorite ? "Remove from" : "Add to"} <Icon name="heart" width={18} height={18} />
        </button>

        {contactHref ? (
          <a className={s.btnGhost} href={contactHref}>Contact</a>
        ) : (
          <button className={`${s.btnGhost} ${s.disabled}`} type="button" disabled>Contact</button>
        )}
      </div>
    </Modal>
  );
};

export default ModalNotice;
