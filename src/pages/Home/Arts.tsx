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
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

import "./arts.css";


const Arts = () => {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [shouldStart, setShouldStart] = useState(false);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".embla__slide");
      
      gsap.to(panels, {
        x: () => (slider.current?.offsetWidth || 0) * -1,
        ease: "none",
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          start: "-=300",
          end: () => "+=" + ((slider.current?.offsetWidth || 0)),
          onUpdate: () => {
            const lastPanel = panels[panels.length - 1];
            const lastPanelBounds = lastPanel.getBoundingClientRect();
            const componentBounds = component.current.getBoundingClientRect();
            
            if (
              lastPanelBounds.left >= componentBounds.left  &&
              lastPanelBounds.right <= componentBounds.right + 1500
            ) {
              setShouldStart(true)
            }
          },
        }
      })
      
    }, component)
    
    return () => {
      ctx.revert()
    }
  })
  
  
  useEffect(()=>{
    if(!shouldStart) return;
    
    var radius = 480; // how big of the radius
    var autoRotate = true; // auto rotate or not
    var rotateSpeed = -60; // unit: seconds/360 degrees
    var imgWidth = 280; // width of images (unit: px)
    var imgHeight = 360; // height of images (unit: px)

    setTimeout(init, 100);
    
    var odrag = document.getElementById('drag-container');
    var ospin = document.getElementById('spin-container');
    var aImg = ospin.getElementsByTagName('img');
    var aVid = ospin.getElementsByTagName('video');
    var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
    ospin.style.width = imgWidth + "px";
    ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
    var ground = document.getElementById('ground');
    ground.style.width = radius * 3 + "px";
    ground.style.height = radius * 3 + "px";
    
    function init(delayTime) {
      for (var i = 0; i < aEle.length; i++) {
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
    
    var sX, sY, nX, nY, desX = 0,
      desY = 0,
      tX = 0,
      tY = 10;

// auto spin
    if (autoRotate) {
      var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
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
  
  return (
    <div ref={component}>
      <div className="flex items-center justify-between container mx-auto mb-[120px]">
        <Title>Các tác phẩm</Title>
      </div>
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
            <div className="embla__slide relative w-fit ml-[400px] flex-shrink-0">
              <div id="drag-container">
                <div id="spin-container">
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
                  
                  <a target="_blank" href="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg">
                    <img
                      src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      alt=""/>
                  </a>
                  <a target="_blank" href="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg">
                    <img
                      src={BrainGif}
                      alt=""/>
                  </a>
                  
                  <a className="text-3xl relative bottom-[100px] right-[150px] w-[600px] text-center flex-shrink-0"
                     target="_blank" href="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg">
                    ...Và rất nhiều các tác phẩm nghệ thuật <br/>
                    khác chờ bạn khám phá
                  </a>
                
                </div>
                <div id="ground"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arts;
