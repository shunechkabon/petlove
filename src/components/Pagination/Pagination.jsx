import s from "./Pagination.module.css";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Icon from "../Icon/Icon";

const ELLIPSIS = "…";

const Pagination = ({ page, totalPages, onChange }) => {
    const isTabletUp = useMediaQuery("(min-width: 768px)");
    const edgeCount = isTabletUp ? 3 : 2;
    const midCount = isTabletUp ? 2 : 1; 

    if (!totalPages || totalPages <= 1) return null;

    const goFirst = () => onChange(1);
    const goPrev = () => onChange(Math.max(1, page - 1));
    const goNext = () => onChange(Math.min(totalPages, page + 1));
    const goLast = () => onChange(totalPages);

    const buildPages = () => {
        if (totalPages <= edgeCount) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const startZoneEnd = edgeCount;
        const endZoneStart = totalPages - edgeCount + 1;

        if (page <= startZoneEnd) {
            return [
                ...Array.from({ length: edgeCount }, (_, i) => i + 1),
                ELLIPSIS,
            ];
        }
        if (page >= endZoneStart) {
            return [
                ELLIPSIS,
                ...Array.from({ length: edgeCount }, (_, i) => endZoneStart + i),
            ];
        }
        if (midCount === 1) {
            return [ELLIPSIS, page, ELLIPSIS];
        }

        return [ELLIPSIS, page - 1, page, ELLIPSIS];
    };

    const pages = buildPages();

    return (
        <nav className={s.wrap} aria-label="Pagination">
            <div className={s.nav}>
                <button onClick={goFirst} disabled={page === 1} className={s.btn}>
                    <Icon name="arrow-left" className={s.icon} width="var(--pag-icon-w)" height="var(--pag-icon-h)"/>
                    <Icon name="arrow-left" className={s.icon} width="var(--pag-icon-w)" height="var(--pag-icon-h)"/>
                </button>
                <button onClick={goPrev} disabled={page === 1} className={s.btn}>
                    <Icon name="arrow-left" className={s.icon} width="var(--pag-icon-w)" height="var(--pag-icon-h)"/>
                </button>
            </div>

            <div className={s.pages}>
                {pages.map((p, idx) =>
                    p === ELLIPSIS ? (
                        <span key={`dots-${idx}`} className={`${s.dots} ${s.btn}`}>{ELLIPSIS}</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onChange(p)}
                            className={`${s.btn} ${s.page} ${p === page ? s.active : ""}`}
                            aria-current={p === page ? "page" : undefined}
                        >
                            {p}
                        </button>
                    )
                )}
            </div>

            <div className={s.nav}>
                <button onClick={goNext} disabled={page === totalPages} className={s.btn}>
                    <Icon name="arrow-right" className={s.icon} width="var(--pag-icon-w)" height="var(--pag-icon-h)"/>
                </button>
                <button onClick={goLast} disabled={page === totalPages} className={s.btn}>
                    <Icon name="arrow-right" className={s.icon} width="var(--pag-icon-w)" height="var(--pag-icon-h)"/>
                    <Icon name="arrow-right" className={s.icon} width="var(--pag-icon-w)" height="var(--pag-icon-h)"/>
                </button>
            </div>
        </nav>
    );
};

export default Pagination;