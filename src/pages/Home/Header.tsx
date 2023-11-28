import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import styles from "./Header.module.css";
import { ArrowForwardIcon } from "@/components/Icon";
import View1 from "/home/view-1.png";
import View2 from "/home/view-2.png";
import View3 from "/home/view-3.png";
import BgView1 from "/home/bg-view-1.png";
import BgView2 from "/home/bg-view-2.png";
import BgView3 from "/home/bg-view-3.png";
import NavTextView1 from "/home/nav-text-view-1.svg";
import NavTextView2 from "/home/nav-text-view-2.svg";
import NavTextView3 from "/home/nav-text-view-3.svg";
import View1Number from "/home/view-1-numb.svg";
import View2Number from "/home/view-2-numb.svg";
import View3Number from "/home/view-3-numb.svg";
import View1BigTitle from "/home/view-1-big-title.svg";
import View2BigTitle from "/home/view-2-big-title.svg";
import View3BigTitle from "/home/view-3-big-title.svg";
import { useEffect, useState } from "react";

const carouselItems = [
  {
    id: "1",
    title: "Góc nhìn",
    img: View1,
    bgImg: BgView1,
    bigTitleImg: View1BigTitle,
    navTextImg: NavTextView1,
    numberImg: View1Number,
  },
  {
    id: "2",
    title: "Hình tượng",
    img: View2,
    bgImg: BgView2,
    bigTitleImg: View2BigTitle,
    navTextImg: NavTextView2,
    numberImg: View2Number,
  },
  {
    id: "3",
    title: "Cảm nhận",
    img: View3,
    bgImg: BgView3,
    bigTitleImg: View3BigTitle,
    navTextImg: NavTextView3,
    numberImg: View3Number,
  },
];

const Header = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: "y",
      align: "center",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      duration: 100,
    },
    [
      WheelGesturesPlugin({
        target: document.body,
      }),
    ],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const selectHandler = () => {
      setActiveSlide(emblaApi.selectedScrollSnap());

      const isLastSlide =
        emblaApi.selectedScrollSnap() === carouselItems.length - 1;

      if (isLastSlide) {
        emblaApi.plugins()?.wheelGestures?.destroy();
      }
    };
    emblaApi.on("select", selectHandler);

    const scrollHandler = () => {
      if (window.scrollY > 0) {
        emblaApi.plugins()?.wheelGestures?.destroy();
      } else {
        emblaApi.reInit(
          {
            axis: "y",
            align: "center",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            duration: 100,
          },
          [
            WheelGesturesPlugin({
              target: document.body,
            }),
          ],
        );
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      emblaApi.off("select", selectHandler);
    };
  }, [emblaApi]);

  const onSelect = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  return (
    <div
      style={{
        height: "calc(100vh - 600px)",
      }}
      className="relative flex flex-col justify-between"
    >
      <div className="container h-full mx-auto embla w-full absolute z-20 top-0 left-0 right-0">
        <div
          className={`embla__viewport min-w-screen overflow-hidden ${styles["embla-viewport"]}`}
          ref={emblaRef}
        >
          <div
            className={`${styles["slide-container"]} embla__container flex flex-col`}
          >
            {carouselItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`${styles.slide} embla__slide relative`}
                >
                  <img
                    className="absolute max-w-[759px] top-1/2 left-[50%] right-0 z-10 -translate-x-1/2 -translate-y-1/2"
                    src={item.img}
                    alt={item.title}
                  />
                  <img
                    className="absolute max-w-[759px] top-1/2 left-[50%] right-0 z-0 -translate-x-1/2 -translate-y-1/2"
                    src={item.bgImg}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="min-h-[100%] pt-[140px] flex flex-col justify-between">
        <div className="flex items-start justify-between container mx-auto relative">
          <button className="flex items-center flex-shrink-0 gap-[12px]">
            <ArrowForwardIcon />
            <p className="text 2xl font-medium">Triển lãm dị diện</p>
          </button>

          <div className="flex flex-col gap-[88px]  relative z-50">
            {carouselItems.map((item, idx) => {
              const index = idx + 1;

              const isActive = activeSlide === idx;

              return (
                <button
                  onClick={() => onSelect(idx)}
                  key={item.id}
                  className="flex flex-col items-end gap-[12px] duration-300"
                >
                  <p
                    className={`${
                      isActive ? "text-[40px]" : "text-[24px]"
                    } text-${
                      isActive ? "white" : "neutral-500"
                    } font-black leading-10 duration-300 origin-bottom-right`}
                  >
                    {index < 10 ? `0${index}` : index}
                  </p>
                  {
                    <img
                      src={item.navTextImg}
                      alt=""
                      className={`duration-300 ${
                        isActive ? "scale-100" : "scale-0"
                      } origin-bottom-right`}
                    />
                  }
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex container mx-auto">
          <div className="relative w-full">
            {carouselItems.map((item, idx) => {
              const isActive = activeSlide === idx;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col items-start absolute top-0 left-0 w-full gap-[32px] duration-300 origin-bottom-left`}
                >
                  <img
                    src={item.numberImg}
                    alt=""
                    className={`${
                      isActive ? "scale-100" : "scale-0"
                    } h-[100px] min-w-[130px] object-contain w-auto origin-bottom-left`}
                  />
                  <img
                    className={isActive ? "scale-100" : "scale-0"}
                    src={item.bigTitleImg}
                    height={86}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
