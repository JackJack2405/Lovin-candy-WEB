export default function PopularBanner() {
  return (
    <section className="w-full">
      <div className="w-full h-45 sm:h-65 lg:h-90">
        <img
          src="/popular-picks.png"
          alt="Popular Candy"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
