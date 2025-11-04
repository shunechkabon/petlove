import s from "./PetBlock.module.css";

const PetBlock = ({
    image,
    imgClassName = "",
    className = "",
    alt = "Pet",
    icon,
    name,
    birthday,
    description,
    showCard = true
}) => {
    return (
        <div className={`${s.container} ${className}`}>
            <img src={image} alt={`${alt} ${name}`} className={`${s.img} ${imgClassName}`} />

            {showCard && (
                <div className={s.card}>
                <div className={s.icon}>
                    <img src={icon} alt={alt}/>
                </div>
                <div className={s.info}>
                    <div className={s.top}>
                        <p className={s.name}>{name}</p>
                        <p className={s.birthday}>
                            Birthday: <span className={s.date}>{birthday}</span>
                        </p>
                    </div>
                    <p className={s.text}>{description}</p>
                </div>
                </div>
            )}
        </div>
    );
};

export default PetBlock;
