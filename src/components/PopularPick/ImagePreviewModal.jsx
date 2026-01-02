export default function ImagePreviewModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <img
        src={image}
        alt="Preview"
        className="max-w-[90%] max-h-[80%] rounded-2xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
