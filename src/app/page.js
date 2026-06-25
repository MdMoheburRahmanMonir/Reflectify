import FeaturedLessons from "@/components/FeaturedLessons";
import HeroSwiperSection from "@/components/HeroSwiperSection";
import MostSavedLessons from "@/components/MostSavedLessons";
import TopContributors from "@/components/TopContributors";
import WhyLifeMatters from "@/components/WhyLifeMatters";
import { userSessionServer } from "@/lib/actions/session";
import { GetFeaturedLesson } from "@/lib/api/HomePageApi/GetFeaturedLesson";


export default async function Home() {
  const session = await userSessionServer();
  const featuredLessonsSeed = await GetFeaturedLesson(session)
  console.log(featuredLessonsSeed, "Fetch data is ");

  return (
    <main className="">
      <HeroSwiperSection />
      <FeaturedLessons featuredLessonsSeed={featuredLessonsSeed.featuredLessonsSeed}  />
      <WhyLifeMatters />
      <TopContributors TopContributors={featuredLessonsSeed.TopContributors} />
      <MostSavedLessons MostSaveLesson={featuredLessonsSeed.MostSaveLesson} />
    </main>
  );
}
