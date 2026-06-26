    "use client";

    import { useRef, useState } from "react";
    import { Swiper, SwiperSlide } from "swiper/react";
    import { Autoplay } from "swiper/modules";

    import "swiper/css";
    import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

    const HeroData = [
        {
            titleFirst: "Capture Your ",
            titleSecont: "Life Lessons",
            description:
                "Preserve your personal wisdom, meaningful experiences, and valuable insights gathered throughout life. Build a personal collection of lessons that can guide your future decisions and inspire others on their journey.",
            image:
                "https://i.ibb.co/8gTgp5qS/akson-1-K8p-Ib-Irhk-Q-unsplash.jpg",
        },
        {
            titleFirst: "Learn, Reflect & ",
            titleSecont: "Grow Every Day",
            description:
                "Transform everyday experiences into lasting knowledge through thoughtful reflection. Explore lessons from the community, discover new perspectives, and develop habits that support continuous personal growth.",
            image:
                "https://i.ibb.co/MyYPRD0Y/vitaly-gariev-QLYH-AU2p60-unsplash.jpg",
        },
        {
            titleFirst: "Share Your ",
            titleSecont: "Journey & Wisdom",
            description:
                "Document your experiences, challenges, and achievements in a meaningful way. Share valuable insights with others, help them learn from your journey, and contribute to a growing community of lifelong learners.",
            image:
                "https://i.ibb.co/0pxNn3v7/vitaly-gariev-PSksb-OVDh-Wk-unsplash.jpg",
        },
        {
            titleFirst: "Unlock Premium ",
            titleSecont: "Insights",
            description:
                "Gain access to exclusive premium lessons, advanced personal growth content, and deeper community knowledge. Unlock powerful insights that can help you learn faster and make more informed life decisions.",
            image:
                "https://i.ibb.co/BH9WvNfg/premium-photo-1722859352952-9e0e24886a1d.avif",
        },
    ];
    export default function HeroSwiper() {
        const swiperRef = useRef(null);
        const [activeIndex, setActiveIndex] = useState(0);

        return (
            <section className="relative -top-20 -mb-20 w-full bg-white dark:bg-slate-950 transition-colors duration-300 py-2 md:py-4 overflow-hidden">

                {/* Ambient background accents */}
                <div className="pointer-events-none absolute -top-20 sm:-top-24 -left-20 sm:-left-24 w-40 sm:w-72 h-40 sm:h-72 rounded-full bg-purple-400/20 dark:bg-purple-500/10 blur-2xl sm:blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 sm:-bottom-24 -right-20 sm:-right-24 w-48 sm:w-80 h-48 sm:h-80 rounded-full bg-blue-400/20 dark:bg-blue-500/10 blur-2xl sm:blur-3xl" />

                <div className="max-w-7xl py-8 sm:py-12 md:py-20 mx-auto px-3 sm:px-5 md:px-10 relative">

                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 4500, disableOnInteraction: false }}
                        loop
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        className="rounded-xl sm:rounded-2xl md:rounded-[2.5rem]"
                    >
                        {HeroData.map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10 lg:gap-16 items-center py-3 sm:py-4 md:py-6">

                                    {/* Text column */}
                                    <div className="order-2 md:order-1 max-w-xl px-2 sm:px-3 md:ml-5">
                                        <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 px-2.5 sm:px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/70 dark:border-blue-400/20 text-blue-600 dark:text-blue-300 text-xs font-medium tracking-wide">
                                            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-blue-500" />
                                            <span className="hidden sm:inline">Life Learning Platform</span>
                                            <span className="sm:hidden">Platform</span>
                                        </div>

                                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] text-slate-900 dark:text-white">
                                            {item.titleFirst}
                                            <span className="bg-linear-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                                                {item.titleSecont}
                                            </span>
                                        </h1>

                                        <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="mt-4 sm:mt-5 md:mt-7 flex flex-wrap items-center gap-2 sm:gap-3">
                                            <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-tl-lg sm:rounded-tl-2xl rounded-br-lg sm:rounded-br-2xl bg-linear-to-r from-purple-500 to-blue-600 text-white text-xs sm:text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200">
                                                Explore
                                            </button>

                                            <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-tl-lg sm:rounded-tl-2xl rounded-br-lg sm:rounded-br-2xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 text-xs sm:text-sm font-medium transition-colors duration-200">
                                                Learn More
                                            </button>

                                            {/* Prev / Next, tucked beside the CTAs */}
                                            <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2">
                                                <button
                                                    onClick={() => swiperRef.current?.slidePrev()}
                                                    aria-label="Previous slide"
                                                    className="w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 rounded-tr-lg sm:rounded-tr-xl rounded-bl-lg sm:rounded-bl-xl bg-slate-100 dark:bg-white/5 hover:bg-blue-500 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors duration-200 text-xs sm:text-sm"
                                                >
                                                    <FaArrowLeft />
                                                </button>
                                                <button
                                                    onClick={() => swiperRef.current?.slideNext()}
                                                    aria-label="Next slide"
                                                    className="w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 rounded-bl-lg sm:rounded-bl-xl rounded-tr-lg sm:rounded-tr-xl bg-slate-100 dark:bg-white/5 hover:bg-blue-500 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors duration-200 text-xs sm:text-sm"
                                                >
                                                    <FaArrowRight />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image column */}
                                    <div className="order-1 md:order-2 relative flex justify-center md:justify-end px-2 sm:px-3 md:pr-5">
                                        <div className="absolute -inset-3 sm:-inset-4 md:-inset-5 bg-linear-to-br from-purple-400/30 to-blue-500/30 rounded-2xl sm:rounded-[2.5rem] md:rounded-[3rem] blur-lg sm:blur-xl md:blur-2xl -z-10" />
                                        <div className="relative w-full max-w-xs sm:max-w-sm aspect-4/5 rounded-tr-2xl sm:rounded-tr-[2.5rem] md:rounded-tr-[3.5rem] rounded-bl-2xl sm:rounded-bl-[2.5rem] md:rounded-bl-[3.5rem] overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl ring-1 ring-black/5 dark:ring-white/10\">
                                            <img
                                                src={item.image}
                                                alt={item.titleSecont}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent" />
                                        </div>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 md:mt-8">
                        {HeroData.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => swiperRef.current?.slideToLoop(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${i === activeIndex
                                        ? "w-6 sm:w-7 md:w-8 bg-linear-to-r from-purple-500 to-blue-600"
                                        : "w-1 sm:w-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                                    }`}
                            />
                        ))}
                    </div>

                </div>
            </section>
        );
    }