import { Title } from "@/components/Title";
import { StarIcon } from "@/components/Icon";
import TVC from "/home/tvc.mp4";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import styles from "./Home.module.css";

const Intro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "none" } });

      tl.to(videoRef.current, {
        scale: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          end: "+=600",
          scrub: true,
          pin: true,
          onEnter: () => {
            videoRef.current?.play();
          },
          onEnterBack: () => {
            videoRef.current?.play();
          },
          onUpdate: () => {
            if (!videoRef.current) return;

            const isVideoInViewport =
              videoRef.current.getBoundingClientRect().top <=
              window.innerHeight;

            if (isVideoInViewport) {
              videoRef.current?.play();
            } else {
              videoRef.current?.pause();
            }
          },
          onLeaveBack: () => {
            videoRef.current?.pause();
          },
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ctx.kill();
    };
  });

  return (
    <div ref={containerRef} className={`${styles.intro}  mb-[800px]`}>
      <div className="container mx-auto">
        <div className="flex items-start justify-between container mx-auto relative">
          <div>
            <Title>Ý nghĩa triển lãm</Title>
            <div className="h-[125px] relative  mt-[36px] mb-[22px]">
              <div className="absolute top-0 left-0">
                <StarIcon width={24} height={24} />
              </div>
              <div className="absolute bottom-0 right-0">
                <StarIcon />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="mb-[56px]">
              <StarIcon width={40} height={40} />
            </div>
            <p className="w-[493px] text-base font-medium leading-6 text-justify mb-[142px]">
              Khác với các triển lãm số thường tìm cách trình bày những điểm gặp
              gỡ giữa nghệ thuật và công nghệ, Dị Diện hướng đến việc diễn giải
              sự hiện diện rộng rãi của công nghệ mới đang tác động đến mối quan
              hệ giữa người và người với thế giới xung quanh.
            </p>
            {/*<div>*/}
            {/*  <img src={IntroShape} alt=""/>*/}
            {/*</div>*/}
          </div>
        </div>
        <video
          style={{
            border: "2px solid #fff",
          }}
          ref={videoRef}
          loop
        >
          <source src={TVC} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Intro;
