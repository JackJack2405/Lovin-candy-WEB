export default function OrderDetailModal({ open, onClose, order }) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-['Jua'] text-xl">
            Order #{order._id.slice(-6).toUpperCase()}
          </h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-gray-50 rounded-xl p-3"
            >
              <img
                src={item.imageUrl || "/logo.png"}
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">
                  {item.price} THB × {item.quantity}
                </div>
              </div>
              <div className="font-semibold">
                {item.price * item.quantity} THB
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="font-semibold">
            Total: {order.total_price} THB
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
