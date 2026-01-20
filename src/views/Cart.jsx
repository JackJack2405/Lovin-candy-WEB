export default function Cart({ pkg, candies, onClose }) {
  if (!pkg) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-[360px] bg-white shadow-xl z-50 p-5">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="mb-4">
        <p className="font-bold">{pkg.name}</p>
        <p className="text-pink-500">฿{pkg.price}</p>
      </div>

      <div className="space-y-2">
        {candies.map(candy => (
          <div key={candy.cartId} className="flex gap-2 items-center">
            <img src={candy.image} className="w-10 h-10" />
            <span>{candy.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full bg-pink-400 text-white py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}