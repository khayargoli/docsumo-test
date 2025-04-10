import { useState, useEffect, useRef, useMemo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import sectionsData from '../../data/sections.json';
import pagesData from '../../data/pages.json';
import { ConfirmationModal } from '../../components/modals/confirmation-modal';
import { SuccessModal } from '../../components/modals/success-modal';
import { PositionMap, ImageDimensions, Tabs } from '../../types/types';
import { DocumentViewer } from './viewer/document-viewer';
import { Field, Section, ZoomLevels } from '../../types/types';
import { FieldsSidebar } from './sidebar/side-bar';

const IMAGE_SRC = pagesData.data.documents[0].pages[0].image.url;

export const ReviewPage = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [activeTab, setActiveTab] = useState<Tabs>('regular');
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [zoom, setZoom] = useState<ZoomLevels>('fit');
    const [imgDims, setImgDims] = useState<ImageDimensions>({ width: 0, height: 0 });

    const selectedIds = useAppSelector(state => state.fields.selectedIds);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setSections(sectionsData.data.sections as Section[]);
    }, []);

    const positionMap = useMemo(() => {
        const map: PositionMap = {};
        sections.forEach(section => {
            section.children.forEach(child => {
                if (child.type === 'line_item') {
                    child.children.forEach(block =>
                        block.forEach(row =>
                            row.forEach(field => {
                                map[field.id.toString()] = field.content.position;
                            })
                        )
                    );
                } else {
                    const field = child as Field;
                    map[field.id.toString()] = field.content.position;
                }
            });
        });
        return map;
    }, [sections]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return;

        const rect = imgRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const scaleX = rect.width / imgDims.width;
        const scaleY = rect.height / imgDims.height;

        const unscaledX = mouseX / scaleX;
        const unscaledY = mouseY / scaleY;

        for (const id in positionMap) {
            const pos = positionMap[id];
            if (!pos || pos.length !== 4) continue;

            const [x1, y1, x2, y2] = pos;
            if (unscaledX >= x1 && unscaledX <= x2 && unscaledY >= y1 && unscaledY <= y2) {
                setHoveredId(Number(id));
                return;
            }
        }

        setHoveredId(null);
    };

    return (
        <div className="flex h-screen">
            <DocumentViewer
                zoom={zoom}
                setZoom={setZoom}
                imgDims={imgDims}
                setImgDims={setImgDims}
                positionMap={positionMap}
                selectedIds={selectedIds}
                hoveredId={hoveredId}
                imgRef={imgRef}
                imgSrc={IMAGE_SRC}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredId(null)}
            />

            <FieldsSidebar
                sections={sections}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                positionMap={positionMap}
                setShowConfirm={setShowConfirm}
            />

            {showConfirm && (
                <ConfirmationModal
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={() => {
                        setShowConfirm(false);
                        setShowSuccess(true);
                    }}
                />
            )}

            {showSuccess && (
                <SuccessModal onClose={() => setShowSuccess(false)} />
            )}
        </div>
    );
};