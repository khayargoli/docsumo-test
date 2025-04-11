import { useState, useEffect, useRef, useCallback } from 'react';
import sectionsData from '../../data/sections.json';
import pagesData from '../../data/pages.json';
import { ConfirmationModal } from '../../components/modals/confirmation-modal';
import { SuccessModal } from '../../components/modals/success-modal';
import { Tabs, DocImage } from '../../types/types';
import { DocumentViewer } from './viewer/document-viewer';
import { Section, ZoomLevels } from '../../types/types';
import { FieldsSidebar } from './sidebar/side-bar';
import usePositionMap from '../../hooks/usePositionMap';

export const ReviewPage = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [activeTab, setActiveTab] = useState<Tabs>('regular');
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [zoom, setZoom] = useState<ZoomLevels>('fit');

    // using image data from json file.
    const imgProps: DocImage = pagesData.data.documents[0].pages[0].image;
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setSections(sectionsData.data.sections as Section[]);
    }, []);

    /* Maps fieldId -> field position for easier and faster lookup.
    In future we can add pageId and extend for multiple pages */
    const positionMap = usePositionMap(sections);


    /* Checks if mouse coordinates are inside any of the field's position coordinates */
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return;

        const rect = imgRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const scaleX = rect.width / imgProps.width;
        const scaleY = rect.height / imgProps.height;

        const unscaledX = mouseX / scaleX;
        const unscaledY = mouseY / scaleY;

        for (const [id, pos] of positionMap.entries()) {
            if (!pos || pos.length !== 4) continue;

            const [x1, y1, x2, y2] = pos;
            if (unscaledX >= x1 && unscaledX <= x2 && unscaledY >= y1 && unscaledY <= y2) {
                setHoveredId(Number(id));
                return;
            }
        }

        setHoveredId(null);
    }, [imgRef, positionMap, imgProps.width, imgProps.height, setHoveredId]);

    return (
        <div className="flex h-screen">

            {/*Document Viewer*/}
            <DocumentViewer
                zoom={zoom}
                setZoom={setZoom}
                positionMap={positionMap}
                hoveredId={hoveredId}
                imgRef={imgRef}
                imgProps={imgProps}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredId(null)}
            />

            {/* Side bar */}
            <FieldsSidebar
                sections={sections}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                positionMap={positionMap}
                setShowConfirm={setShowConfirm}
            />

            {/* Modals */}
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