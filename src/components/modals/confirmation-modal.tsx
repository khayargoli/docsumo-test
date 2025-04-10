interface ConfirmationModalProps {
    onCancel: () => void;
    onConfirm: () => void;
  }
  
  export const ConfirmationModal = ({ onCancel, onConfirm }: ConfirmationModalProps) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl w-[320px] text-center">
        <h3 className="text-lg font-semibold mb-3">Are you sure you want to confirm the selected fields?</h3>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );