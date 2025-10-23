import s from "./FriendsItem.module.css";

const normalizeDays = (days) => {
    if (!Array.isArray(days)) return Array(7).fill(null);
    const copy = days.slice(0, 7);
    while (copy.length < 7) copy.push(null);
    return copy;
};

const badgeText = (workDays) => {
    const days = normalizeDays(workDays);
    const idxMonFirst = (d) => (d + 6) % 7;
    const today = days[idxMonFirst(new Date().getDay())];
    return today?.from && today?.to ? `${today.from} - ${today.to}` : "Day and night";
};

const FriendsItem = ({ item }) => {
    const {
        title,
        url,
        imageUrl,
        address,
        addressUrl,
        phone,
        email,
        workDays,
    } = item;

    const label = badgeText(workDays);
    
    return (
        <li className={s.card}>
            <span className={s.schedule}>{label}</span>

            <a
                className={s.logo}
                href={/^https?:\/\//i.test(url) ? url : `https://${url}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={`Open ${title} website`}
            >
                <img className={s.img} src={imageUrl} alt={`${title} logo`} />
            </a>

            <div className={s.contact}>
                <a
                    className={s.title}
                    href={/^https?:\/\//i.test(url) ? url : `https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={`Open ${title} website`}
                >
                    {title}
                </a>
    
                <ul className={s.details}>
                    <li className={s.row}>
                        <span className={s.label}>Email:</span>
                        {email ? (
                            <a className={`${s.value} ${s.link}`} href={`mailto:${email}`}>
                                {email}
                            </a>
                        ) : (
                            <span className={s.value}>website only</span>
                        )}
                    </li>

                    <li className={s.row}>
                        <span className={s.label}>Address:</span>
                        {address ? (
                            addressUrl ? (
                                <a
                                    className={`${s.value} ${s.link}`}
                                    href={addressUrl}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                >
                                    {address}
                                </a>
                            ) : (
                                    <span className={s.value}>{address}</span>
                                )
                        ) : (
                            <span className={s.value}>website only</span>
                        )}
                    </li>
    
                    <li className={s.row}>
                        <span className={s.label}>Phone:</span>
                        {phone ? (
                            <a className={`${s.value} ${s.link}`} href={`tel:${phone}`}>
                                {phone}
                            </a>
                        ) : (
                            <span className={s.value}>email only</span>
                        )}
                    </li>
                </ul>
            </div>
        </li>
    );
};

export default FriendsItem;