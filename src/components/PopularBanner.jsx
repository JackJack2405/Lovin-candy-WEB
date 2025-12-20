export default function PopularBanner() {
  return (
    <section className="w-full bg-[#EAF9FF]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative w-full aspect-16/5 sm:aspect-16/4 lg:aspect-16/3 overflow-hidden rounded-3xl">
          <img
            src="/popular-picks.png"
            alt="Popular Candy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
