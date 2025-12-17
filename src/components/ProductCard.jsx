export default function ProductCard({ image, name, price }) {
  return (
    <div className="bg-pink-100 rounded-3xl p-4 flex flex-col items-center gap-3">
      <img src={image} alt={name} className="w-32 h-32 object-contain" />

      <p className="text-pink-600 font-bold text-center">{name}</p>
      <p className="text-sm text-gray-600">{price} ฿</p>

      <button className="px-4 py-1 rounded-xl border border-pink-400 text-pink-500 hover:bg-pink-200">
        I want this
      </button>
    </div>
  );
}
