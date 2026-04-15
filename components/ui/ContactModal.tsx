export default function ContactModal({
  isOpen,
  onClose,
  selectedRow,
  setSelectedRow,
  updateContact,
  loading,
  message,
  error,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Contact</h2>

        {/* Success Message */}
        {message && (
          <p className="text-green-600 text-sm mb-2">{message}</p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}

        {/* Name */}
        <input
          className="w-full border p-2 mb-3"
          placeholder="Name"
          value={selectedRow?.name || ""}
          onChange={(e) =>
           {if(!selectedRow) return;
            setSelectedRow({
              ...selectedRow,
              name: e.target.value,
            })}
          }
        />

        {/* Email */}
        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          value={selectedRow?.email || ""}
          onChange={(e) =>
            setSelectedRow({
              ...selectedRow,
              email: e.target.value,
            })
          }
        />

        {/* Message */}
        <textarea
          className="w-full border p-2 mb-3"
          placeholder="Message"
          value={selectedRow?.message || ""}
          onChange={(e) =>
            setSelectedRow({
              ...selectedRow,
              message: e.target.value,
            })
          }
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={updateContact}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}