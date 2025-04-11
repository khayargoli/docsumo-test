import { useMemo } from 'react';
import { Section, LineItemField, Field } from '../types/types';

/* returns map of fieldId -> field.position (bbox coordinates)*/
const usePositionMap = (sections: Section[]) => {
    return useMemo(() => {
        const map = new Map<string, number[]>();
        sections.forEach(section => {
            section.children.forEach(child => {
                if (child.type === 'line_item') {
                    (child as LineItemField).children.forEach(block =>
                        block.forEach(row =>
                            row.forEach(field => {
                                map.set(field.id.toString(), field.content.position);
                            })
                        )
                    );
                } else {
                    const field = child as Field;
                    map.set(field.id.toString(), field.content.position);
                }
            });
        });
        return map;
    }, [sections]);
};

export default usePositionMap;
