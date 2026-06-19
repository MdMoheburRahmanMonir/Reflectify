import FeaturedLessons from "@/components/FeaturedLessons";
import HeroSwiperSection from "@/components/HeroSwiperSection";
import MostSavedLessons from "@/components/MostSavedLessons";
import TopContributors from "@/components/TopContributors";
import WhyLifeMatters from "@/components/WhyLifeMatters";


export default function Home() {
  return (
    <main className="">
      <HeroSwiperSection />
      <FeaturedLessons />
      <WhyLifeMatters />
      <TopContributors />
      <MostSavedLessons />
    </main>
  );
}
