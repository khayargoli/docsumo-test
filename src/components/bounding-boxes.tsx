import { PositionMap, ImageDimensions } from "../types/types";

interface BoundingBoxesProps {
    selectedIds: number[];
    hoveredId: number | null;
    positionMap: PositionMap;
    imgDims: ImageDimensions;
    imgRef: React.RefObject<HTMLImageElement | null>;
}

export const BoundingBoxes = ({
    selectedIds,
    hoveredId,
    positionMap,
    imgDims,
    imgRef,
}: BoundingBoxesProps) => {
    const hoveredIds = hoveredId ? [hoveredId] : [];
    const allIds = [...selectedIds, ...hoveredIds];
    const uniqueAllIds = Array.from(new Set(allIds));

    return (
        <>
            {uniqueAllIds.map(id => {
                const box = positionMap[id.toString()];
                if (!box || box.length !== 4) return null;

                const [x1, y1, x2, y2] = box;
                const scaleX = imgRef.current ? imgRef.current.clientWidth / imgDims.width : 1;
                const scaleY = imgRef.current ? imgRef.current.clientHeight / imgDims.height : 1;

                const w = x2 - x1;
                const h = y2 - y1;
                return (
                    <div
                        key={id}
                        className={`absolute border-2 ${hoveredId === id ? 'border-yellow-400' : 'border-blue-400'} pointer-events-none`}
                        style={{
                            left: x1 * scaleX,
                            top: y1 * scaleY,
                            width: w * scaleX,
                            height: h * scaleY,
                        }}
                    />
                );
            })}
        </>
    );
};