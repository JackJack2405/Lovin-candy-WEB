import Hero from "../components/Hero";
import PopularBanner from "../components/PopularBanner";
import PopularPicks from "../components/PopularPicks";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularBanner />   {/*← ใต้ Hero */}
      <PopularPicks />    {/* ← grid สินค้า */}
    </>
  );
}

