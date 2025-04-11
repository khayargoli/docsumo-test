import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Field } from '../types/types';
import { useAppDispatch } from '../redux/hooks';
import { selectField, deselectField, removeField } from '../redux/slices/fieldsSlice';
import { useState } from 'react';
import { getInitials, getRandomColor } from '../lib/utils/utility';

interface FieldItemProps {
    field: Field;
    selected: boolean;
    hovered: boolean;
    removed: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const FieldItem = ({
    field,
    selected,
    hovered,
    removed,
    onMouseEnter,
    onMouseLeave,
}: FieldItemProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useAppDispatch();

    const toggleSelect = (id: number) => {
        if (selected) {
            dispatch(deselectField(id));
        } else {
            dispatch(selectField(id));
        }
    };


    if (removed) return null;

    const initials = getInitials(field.label).toUpperCase();
    const badgeColor = getRandomColor(initials);

    return (
        <li
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`mb-3 p-2 border rounded flex items-center justify-between ${selected ? 'bg-blue-50' : ''} ${hovered ? 'border-2 border-blue-400' : ''}`}
        >
            <div className="flex items-center gap-2">
                <span className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-md`} style={{ backgroundColor: badgeColor }}>
                    {initials}
                </span>
                <div>
                    <div className="text-sm font-semibold">{field.label}</div>
                    <div className="text-xs text-gray-600">{field.content.value}</div>
                </div>
            </div>

            <div className="relative flex gap-x-4">
                <input
                    name='check'
                    aria-label='toggle select'
                    type="checkbox"
                    className="ml-2 scale-[1.5]"
                    checked={selected}
                    onChange={() => toggleSelect(field.id)}
                />

                <button
                    name='more'
                    aria-label='more'
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1 outline-none bg-transparent scale-[1.5]"
                >
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button>
                {menuOpen && (
                    <div className="absolute right-2 top-10 z-10 outline-none shadow-lg rounded text-sm">
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-200 bg-white border-gray-500 border-1"
                            onClick={() => {
                                dispatch(removeField(field.id));
                                setMenuOpen(false);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>
        </li>
    );
};