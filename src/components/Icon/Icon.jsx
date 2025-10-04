const Icon = ({ name, width = 20, height = 20, className = "", style = {} }) => {
    if (!name) return null;

    const spritePath = `${import.meta.env.BASE_URL}icons.svg`;

    return (
        <svg
            width={width}
            height={height}
            style={style}
            className={className}
            aria-hidden="true"
        >
            <use href={`${spritePath}#${name}`} />
        </svg>
    );
};

export default Icon;
