import Hero from "../components/Hero";
import PopularBanner from "../components/PopularPick/PopularBanner";
import PopularPicks from "../components/PopularPick/PopularPicks";
import SpecialSets from "../components/SpecialSets";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularPicks />
      <PopularBanner />
      <SpecialSets />
    </>
  );
}

