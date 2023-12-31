// @ts-nocheck

import {Title} from "@/components/Title";
import Art1 from "/home/art-1.png";
import Art2 from "/home/art-2.png";
import Art3 from "/home/art-3.png";
import Art4 from "/home/art-4.png";
import Art5 from "/home/art-5.png";
import Art6 from "/home/art-6.png";
import ArtNumb1 from "/home/art-num-1.svg";
import ArtNumb2 from "/home/art-num-2.svg";
import ArtNumb3 from "/home/art-num-3.svg";
import ArtNumb4 from "/home/art-num-4.svg";
import ArtNumb5 from "/home/art-num-5.svg";
import ArtNumb6 from "/home/art-num-6.svg";
import ScrollTrigger from "gsap/ScrollTrigger";
import BrainGif from '/home/brain-1.gif'
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

import "./arts.css";


const Arts = () => {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [shouldStart, setShouldStart] = useState(false);
  const galleryRef = useRef(null);
  
  const onScroll = () => {
    if(!galleryRef.current) return;
    
    const isGalleryRefInViewport = galleryRef.current.getBoundingClientRect().top < window.innerHeight;
    setShouldStart(isGalleryRefInViewport);
  }
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".embla__slide");
      
      const tl = gsap.timeline({})
      
      
      tl.to(galleryRef.current, {
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          pin: true,
          scrub: 1,
          start: "-=300",
          end: "+=300",
        },
      }).to(panels, {
        x: () => (slider.current?.offsetWidth || 0) * -1,
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          start: "-=300",
          end: () => "+=" + ((slider.current?.offsetWidth || 0)),
        }
      })
      
    }, component)
    
    return () => {
      ctx.revert()
      ctx.kill()
    }
  })
  
  
  useEffect(()=>{
    let tX;
    let tY;
    if(!shouldStart) return;
    
    const radius = 480; // how big of the radius
    const autoRotate = true; // auto rotate or not
    const rotateSpeed = -60; // unit: seconds/360 degrees
    const imgWidth = 280; // width of images (unit: px)
    const imgHeight = 360; // height of images (unit: px)

    setTimeout(init, 1000);
    
    const odrag = document.getElementById('drag-container');
    const ospin = document.getElementById('spin-container');
    const aImg = ospin.getElementsByTagName('img');
    const aVid = ospin.getElementsByTagName('video');
    const aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
    ospin.style.width = imgWidth + "px";
    ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
    const ground = document.getElementById('ground');
    ground.style.width = radius * 3 + "px";
    ground.style.height = radius * 3 + "px";
    
    function init(delayTime) {
      for (let i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
      }
    }
    
    function applyTranform(obj) {
      // Constrain the angle of camera (between 0 and 180)
      if(tY > 180) tY = 180;
      if(tY < 0) tY = 0;
      
      // Apply the angle
      obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
    }
    
    function playSpin(yes) {
      ospin.style.animationPlayState = (yes?'running':'paused');
    }
    
    let desX = 0;
    let desY = 0;
    tX = 0;
    tY = 10;

// auto spin
    if (autoRotate) {
      const animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
      ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
    }


// setup events
    document.onpointerdown = function (e) {
      clearInterval(odrag.timer);
      e = e || window.event;
      let sX = e.clientX,
        sY = e.clientY;
      
      this.onpointermove = function (e) {
        e = e || window.event;
        const nX = e.clientX,
          nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
      };
      
      this.onpointerup = function (e) {
        odrag.timer = setInterval(function () {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTranform(odrag);
          playSpin(false);
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(odrag.timer);
            playSpin(true);
          }
        }, 17);
        this.onpointermove = this.onpointerup = null;
      };
      
      return false;
    };
   
    
  },[shouldStart])
  
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, []);
  
  return (
    <div ref={component}>
      
      <div className="flex items-center justify-between container mx-auto mb-[200px] text-center">
        <Title className="w-full text-center">Các tác phẩm</Title>
      </div>
      <div ref={galleryRef} className="container mx-auto text-center mt-[100px] mb-[300px]">
        <div className="mx-auto relative w-fit flex-shrink-0">
          <div id="drag-container">
            <div id="spin-container">
              <img
                src={BrainGif}
                alt=""/>
              <img
                src={Art1}
                alt=""/>
              <img
                src={Art2}
                alt=""/>
              <img
                src={Art3}
                alt=""/>
              <img
                src={Art4}
                alt=""/>
              <img
                src={Art5}
                alt=""/>
              <img
                src={Art6}
                alt=""/>
              
              <img
                src={BrainGif}
                alt=""/>
              
            </div>
            <div id="ground"></div>
          </div>
        </div>
      </div>
      
      <p className="w-full text-center my-[100px]">
        ...Và rất nhiều các tác phẩm nghệ thuật <br/>
        khác chờ bạn khám phá
      </p>
      
      <div >
        <div className="embla mx-auto w-[1640px]">
          <div className="embla__viewport">
            <div ref={slider} className="embla__container flex items-center gap-[62px]">
              <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
                <img src={ArtNumb1} alt="" height={320}/>
                <img src={Art1} alt=""/>
              </div>
              <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
                <img src={Art2} alt=""/>
                <img src={ArtNumb2} alt="" height={68}/>
              </div>
              <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
                <img src={ArtNumb3} alt="" height={68}/>
                <img src={Art3} alt=""/>
              </div>
              <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
                <img src={Art4} alt=""/>
                <img src={ArtNumb4} alt="" height={68}/>
              </div>
              <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
                <img src={ArtNumb5} alt=""/>
                <img src={Art5} alt="" height={302}/>
              </div>
              <div className="embla__slide w-fit flex flex-col gap-[20px] items-end flex-shrink-0">
                <img src={Art6} alt="" height={320}/>
                <img src={ArtNumb6} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arts;
