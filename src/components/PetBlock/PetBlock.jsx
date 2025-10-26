import s from "./PetBlock.module.css";

const PetBlock = ({ image, className = "", alt = "Pet", icon, name, birthday, description }) => {
    return (
        <div className={s.container}>
            <img src={image} alt={`${alt} ${name}`} className={`${s.img} ${className}`} />

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
        </div>
    );
};

export default PetBlock;
