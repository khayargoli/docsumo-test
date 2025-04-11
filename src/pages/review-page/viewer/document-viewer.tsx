import { BoundingBoxes } from '../../../components/bounding-boxes';
import { useAppSelector } from '../../../redux/hooks';
import { DocImage, ZoomLevels } from '../../../types/types';
import { RefObject } from 'react';

interface DocumentViewerProps {
  zoom: ZoomLevels;
  setZoom: (zoom: ZoomLevels) => void;
  positionMap: Map<string, number[]>;
  hoveredId: number | null;
  imgRef: RefObject<HTMLImageElement | null>;
  imgProps: DocImage;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

export const DocumentViewer = ({
  zoom,
  setZoom,
  positionMap,
  hoveredId,
  imgRef,
  imgProps,
  onMouseMove,
  onMouseLeave,
}: DocumentViewerProps) => {
  const selectedIds = useAppSelector(state => state.fields.selectedIds);
  return (
    <main className="flex-1 flex flex-col items-center px-40 py-10">
      <div className="w-full">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold">Document Preview</h2>
          <select
            aria-label='zoom level'
            className="border px-2 py-1 rounded"
            onChange={(e) => setZoom(e.target.value as ZoomLevels)}
          >
            <option label='fit' value="fit">Fit</option>
            <option label='75%' value="75%">75%</option>
            <option label='100%' value="100%">100%</option>
          </select>
        </div>
        <div
          className="max-h-[90vh] max-w-[65vw] border overflow-auto bg-gray-100 "
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <div
            style={{
              transform: zoom === 'fit' ? 'scale(1)' : `scale(${parseInt(zoom) / 100})`,
            }}
          >
            <img
              ref={imgRef}
              src={`/${imgProps.url}`}
              alt="Document Preview"
              className="object-contain"
            />

            {/* Bounding boxes */}
            <BoundingBoxes
              hoveredId={hoveredId}
              positionMap={positionMap}
              selectedIds={selectedIds}
              imgProps={imgProps}
              imgRef={imgRef}
            />
          </div>
        </div>
      </div>
    </main>
  );
};