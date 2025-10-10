import s from "./Pagination.module.css";

const Pagination = ({ page, totalPages, onChange }) => {
    if (!totalPages || totalPages <= 1) return null;

    const goFirst = () => onChange(1);
    const goPrev = () => onChange(Math.max(1, page - 1));
    const goNext = () => onChange(Math.min(totalPages, page + 1));
    const goLast = () => onChange(totalPages);

    const buildPages = () => {
        const res = [];
        const push = (v) => {
            const last = res[res.length - 1];
            if (v === "..." && last === "...") return;
            res.push(v);
        };

        for (let i = 1; i <= totalPages; i++) {
            const isEdge = i === 1 || i === totalPages;
            const isNear = Math.abs(i - page) <= 1;

            if (isEdge || isNear) push(i);
            else if (i === 2 && page > 3) push("...");
            else if (i === totalPages - 1 && page < totalPages - 2) push("...");
        }
        return res;
    };

    const pages = buildPages();

    return (
        <nav className={s.wrap} aria-label="Pagination">
            <button onClick={goFirst} disabled={page === 1} className={s.nav}>&laquo;</button>
            <button onClick={goPrev} disabled={page === 1} className={s.nav}>&lsaquo;</button>

            {pages.map((p, idx) =>
                p === "..." ? (
                    <span key={`dots-${idx}`} className={s.dots}>…</span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onChange(p)}
                        className={`${s.page} ${p === page ? s.active : ""}`}
                        aria-current={p === page ? "page" : undefined}
                    >
                        {p}
                    </button>
                )
            )}

            <button onClick={goNext} disabled={page === totalPages} className={s.nav}>&rsaquo;</button>
            <button onClick={goLast} disabled={page === totalPages} className={s.nav}>&raquo;</button>
        </nav>
    );
};

export default Pagination;