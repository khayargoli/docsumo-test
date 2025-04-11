import { FieldItem } from "../../../components/field-item";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearSelection, selectAll } from "../../../redux/slices/fieldsSlice";
import { Field, LineItemField, Section } from "../../../types/types";

interface FieldsSidebarProps {
    sections: Section[];
    activeTab: 'regular' | 'column';
    setActiveTab: (tab: 'regular' | 'column') => void;
    hoveredId: number | null;
    setHoveredId: (id: number | null) => void;
    positionMap: Map<string, number[]>;
    setShowConfirm: (show: boolean) => void;
}

export const FieldsSidebar = ({
    sections,
    activeTab,
    setActiveTab,
    hoveredId,
    setHoveredId,
    positionMap,
    setShowConfirm,
}: FieldsSidebarProps) => {
    const selectedIds = useAppSelector(state => state.fields.selectedIds);
    const removedIds = useAppSelector(state => state.fields.removedIds);
    const dispatch = useAppDispatch();

    /* Handling line items */
    const renderLineItemFieldAsFields = (lineItem: LineItemField) => {
        return lineItem.children.map(block => (
            block.map(row => (
                row.map((field: Field) => <FieldItem
                    key={field.id}
                    field={field}
                    selected={selectedIds.includes(field.id)}
                    hovered={hoveredId === field.id}
                    removed={removedIds.includes(field.id)}
                    onMouseEnter={() => setHoveredId(field.id)}
                    onMouseLeave={() => setHoveredId(null)}
                />)
            ))
        ));
    };

    return (
        <aside className="w-96 border-l p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Fields</h2>

            <div className="flex space-x-2 mb-4">
                <button
                    className={`px-3 py-1 rounded ${activeTab !== 'regular' ? 'bg-white' : 'bg-yellow-200'}`}
                    onClick={() => setActiveTab('regular')}
                >
                    Regular Fields
                </button>
                <button
                    className={`px-3 py-1 rounded ${activeTab !== 'column' ? 'bg-white' : 'bg-yellow-200'}`}
                    onClick={() => setActiveTab('column')}
                >
                    Column Fields
                </button>
            </div>

            {sections.map(section => (
                <div key={section.id} className="mb-2">
                    <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                    <ul>
                        {section.children.map(field => {
                            if (activeTab === 'regular' && field.type !== 'line_item') {
                                return (
                                    <FieldItem
                                        key={field.id}
                                        field={field}
                                        selected={selectedIds.includes(field.id)}
                                        hovered={hoveredId === field.id}
                                        removed={removedIds.includes(field.id)}
                                        onMouseEnter={() => setHoveredId(field.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                    />
                                );
                            }

                            if (activeTab === 'column' && field.type === 'line_item') {
                                return renderLineItemFieldAsFields(field as LineItemField);
                            }
                            return null;
                        })}
                    </ul>
                </div>
            ))}

            <div className="flex justify-between items-center px-2 border-none p-2 bg-gray-200">
                <button
                    className="px-4 py-1 text-sm rounded bg-green-500 hover:bg-green-200"
                    onClick={() => {
                        const allIds = [...positionMap.keys()].filter(id => !removedIds.includes(parseInt(id)));
                        const allSelected = allIds.every(id => selectedIds.includes(parseInt(id)));

                        if (allSelected) {
                            dispatch(clearSelection());
                        } else {
                            dispatch(selectAll(allIds.map(d => Number(d))));
                        }
                    }}
                >
                    Select All
                </button>

                <button
                    className={`px-4 py-1 text-sm rounded ${selectedIds.length > 0 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}
                    disabled={selectedIds.length === 0}
                    onClick={() => setShowConfirm(true)}
                >
                    Confirm
                </button>
            </div>
        </aside>
    );
};