interface SuccessModalProps {
    onClose: () => void;
}

export const SuccessModal = ({ onClose }: SuccessModalProps) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-xl w-[280px] text-center">
            <h3 className="text-lg font-semibold mb-2">Fields confirmed and processed successfully!</h3>
            <button
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    </div>
);