const Icon = ({ name, width, height, className = "", style = {} }) => {
    if (!name) return null;

    const svgProps = { className, style: { ...style }, "aria-hidden": true };

    if (typeof width === "number") svgProps.width = width;
    else if (width) svgProps.style.width = width;

    if (typeof height === "number") svgProps.height = height;
    else if (height) svgProps.style.height = height;

    return (
        <svg {...svgProps}>
            <use href={`#icon-${name}`} />
        </svg>
    );
};

export default Icon;
