import { DocImage } from "../types/types";

interface BoundingBoxesProps {
    selectedIds: number[];
    hoveredId: number | null;
    positionMap: Map<string, number[]>;
    imgProps: DocImage;
    imgRef: React.RefObject<HTMLImageElement | null>;
}

export const BoundingBoxes = ({
    selectedIds,
    hoveredId,
    positionMap,
    imgProps,
    imgRef,
}: BoundingBoxesProps) => {

    const hoveredIds = hoveredId ? [hoveredId] : [];
    const allIds = [...selectedIds, ...hoveredIds];
    const uniqueAllIds = Array.from(new Set(allIds));

    /* Draws rectangle from retreiving boundingbox coordinates from fieldId */
    return (
        <>
            {uniqueAllIds.map(id => {
                const box = positionMap.get(id.toString());
                if (!box || box.length !== 4 || !imgRef.current) return null;

                const [x1, y1, x2, y2] = box;
                const scaleX = imgRef.current.clientWidth / imgProps.width;
                const scaleY = imgRef.current.clientHeight / imgProps.height;

                const width = x2 - x1;
                const height = y2 - y1;

                return (
                    <div
                        key={id}
                        className={`absolute border-2 ${hoveredId === id ? 'border-yellow-400' : 'border-blue-400'} pointer-events-none`}
                        style={{
                            left: x1 * scaleX,
                            top: y1 * scaleY,
                            width: width * scaleX,
                            height: height * scaleY,
                        }}
                    />
                );
            })}
        </>
    );
};