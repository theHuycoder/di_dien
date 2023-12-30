import {useRef, useEffect, useCallback} from 'react'

const ScrolledButton = ({
                          click = () => {
                          }
                        }) => {
  const bgRef = useRef<HTMLDivElement>(null);
  
  
  const onMouseScroll =  useCallback(()=> {
    if(!bgRef.current) return;
    
    bgRef.current.style.transform = "rotate(" + window.scrollY/4 + "deg)"
    
  },[])
  
  useEffect(() => {
    window.addEventListener('scroll', onMouseScroll);
    return () => {
      window.removeEventListener('scroll', onMouseScroll);
    }
  },[onMouseScroll])
  
  return (
    <button onClick={click} className="flex items-center justify-center relative w-[106px] h-[102px]">
      <div ref={bgRef} className="absolute inset-0 rotate-45">
        <svg width="106" height="103" viewBox="0 0 106 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M52.274 0.000133783H84.7032V21.2969H52.274V0.000133783ZM21.2969 21.297H84.7032V48.4018H106V80.8311H84.7032V80.8312H53.7261V102.128H21.2969V80.8312V80.8311L21.2969 53.7262H8.44132e-05L8.58307e-05 21.297H21.2969Z"
                fill="#9C69F9"/>
        </svg>
      
      </div>
      <div
        className="text-center text-[12px] font-bold leading-[12px] relative z-20 flex flex-col items-center justify-center gap-[2px]">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="16" rx="8" fill="white"/>
          <path d="M8 3.875V12.125" stroke="#040C28" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.625 8.75L8 12.125L11.375 8.75" stroke="#040C28" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Mua vé <br/>
        ngay
      </div>
    </button>
  )
}

export default ScrolledButton;