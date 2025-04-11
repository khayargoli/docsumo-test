import { useCallback } from 'react';

export const useFieldHover = (
    imgRef: React.RefObject<HTMLImageElement | null>,
    positionMap: Map<string, number[]>,
    imgWidth: number,
    imgHeight: number,
    setHoveredId: (id: number | null) => void
) => {
    return useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return;

        const rect = imgRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const scaleX = rect.width / imgWidth;
        const scaleY = rect.height / imgHeight;

        const unscaledX = mouseX / scaleX;
        const unscaledY = mouseY / scaleY;

        for (const [id, pos] of positionMap) {
            if (!pos || pos.length !== 4) continue;

            const [x1, y1, x2, y2] = pos;
            if (unscaledX >= x1 && unscaledX <= x2 && unscaledY >= y1 && unscaledY <= y2) {
                setHoveredId(Number(id));
                return;
            }
        }

        setHoveredId(null);
    }, [imgRef, positionMap, imgWidth, imgHeight, setHoveredId]);
};
