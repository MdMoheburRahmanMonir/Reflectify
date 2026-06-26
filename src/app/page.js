import FeaturedLessons from "@/components/FeaturedLessons";
import HeroSwiperSection from "@/components/HeroSwiperSection";
import MostSavedLessons from "@/components/MostSavedLessons";
import TopContributors from "@/components/TopContributors";
import WhyLifeMatters from "@/components/WhyLifeMatters"; 
import { GetFeaturedLesson } from "@/lib/api/HomePageApi/GetFeaturedLesson"; 


export default async function Home() {  
  const featuredLessonsSeed = await GetFeaturedLesson() 
  return (
    <main className="">
      <HeroSwiperSection />
      <FeaturedLessons featuredLessonsSeed={featuredLessonsSeed.featuredLessonsSeed} />
      <WhyLifeMatters />
      <TopContributors TopContributors={featuredLessonsSeed.TopContributors} />
      <MostSavedLessons MostSaveLesson={featuredLessonsSeed.MostSaveLesson} />
    </main>
  );
}
