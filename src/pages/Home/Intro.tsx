import { Title } from "@/components/Title";
import { StarIcon } from "@/components/Icon";
import TVC from "/home/tvc.mp4";
import gsap from "gsap";
import {useLayoutEffect, useRef} from "react";

let timeout: NodeJS.Timeout | null = null;

const Intro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useLayoutEffect(()=> {
    const ctx = gsap.context(()=>{
      const tl = gsap
      .timeline({defaults: {ease: "none"}})
      
      tl.to(videoRef.current, {
        scale: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          end: "+=400",
          scrub: true,
          pin: true,
          onEnter: ()=>{
            if(timeout) clearTimeout(timeout)
            videoRef.current?.play()
          },
          onEnterBack: ()=>{
            if(timeout) clearTimeout(timeout)
            videoRef.current?.play()
          },
          onLeave: ()=>{
            if(timeout) clearTimeout(timeout)
            
            timeout = setTimeout(()=>{
              videoRef.current?.pause()
            },3000)
          },
          
        }
      })
      
    },containerRef)
    
    return ()=> {
      ctx.revert()
      ctx.kill()
    }
  })
  
  
  return (
    <div ref={containerRef} className="container mx-auto mb-[800px]">
      <div  className="flex items-start justify-between container mx-auto relative">
        <div>
          <Title>Ý nghĩa triển lãm</Title>
          <div className="h-[125px] relative  mt-[36px] mb-[22px]">
            <div className="absolute top-0 left-0">
              <StarIcon/>
            </div>
            <div className="absolute bottom-0 right-0">
              <StarIcon/>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="mb-[56px]">
            <StarIcon/>
          </div>
          <p className="w-[493px] text-base font-medium leading-6 text-justify mb-[142px]">
            Khác với các triển lãm số thường tìm cách trình bày những điểm gặp gỡ
            giữa nghệ thuật và công nghệ, Dị Diện hướng đến việc diễn giải sự hiện
            diện rộng rãi của công nghệ mới đang tác động đến mối quan hệ giữa
            người và người với thế giới xung quanh.
          </p>
          {/*<div>*/}
          {/*  <img src={IntroShape} alt=""/>*/}
          {/*</div>*/}
        </div>
      </div>
      <video style={{
        border: '2px solid #fff'
      }} ref={videoRef} autoPlay loop>
        <source src={TVC} type="video/mp4"/>
      </video>
    </div>
  )
};

export default Intro;
