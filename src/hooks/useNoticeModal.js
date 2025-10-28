import { useCallback, useEffect, useState } from "react";
import { getNoticeById } from "../api/notices";

export default function useNoticeModal() {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const openNotice = useCallback(async (card, { markViewed = false } = {}) => {
        setItem(card || null);
        setOpen(true);
        if (markViewed && card?.id) {
            try {
                setLoading(true);
                await getNoticeById(card.id);
            } finally {
                setLoading(false);
            }
        }
    }, []);

    const closeNotice = useCallback(() => {
        setOpen(false);
        setItem(null);
    }, []);

    // Esc
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && closeNotice();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, closeNotice]);

    return { open, item, loading, openNotice, closeNotice, setItem };
}
