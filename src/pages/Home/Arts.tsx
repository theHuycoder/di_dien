import { Title } from "@/components/Title";
import Art1 from "/home/art-1.png";
import Art2 from "/home/art-2.png";
import Art3 from "/home/art-3.png";
import Art4 from "/home/art-4.png";
import ArtNumb1 from "/home/art-num-1.svg";
import ArtNumb2 from "/home/art-num-2.svg";
import ArtNumb3 from "/home/art-num-3.svg";
import ArtNumb4 from "/home/art-num-4.svg";
import useEmblaCarousel from "embla-carousel-react";

const Arts = () => {
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    slidesToScroll: 1,
    dragFree: true,
  });

  return (
    <>
      <div className="flex items-center justify-between container mx-auto mb-[68px]">
        <Title>Các tác phẩm</Title>
      </div>
      <div className="embla container mx-auto">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex gap-[62px]">
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={ArtNumb1} alt="" height={68} />
              <img src={Art1} alt="" />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={Art2} alt="" />
              <img src={ArtNumb2} alt="" height={68} />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={ArtNumb3} alt="" height={68} />
              <img src={Art3} alt="" />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={Art4} alt="" />
              <img src={ArtNumb4} alt="" height={68} />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={ArtNumb1} alt="" height={68} />
              <img src={Art1} alt="" />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={Art2} alt="" />
              <img src={ArtNumb2} alt="" height={68} />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={ArtNumb3} alt="" height={68} />
              <img src={Art3} alt="" />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={Art4} alt="" />
              <img src={ArtNumb4} alt="" height={68} />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={ArtNumb1} alt="" height={68} />
              <img src={Art1} alt="" />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={Art2} alt="" />
              <img src={ArtNumb2} alt="" height={68} />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={ArtNumb3} alt="" height={68} />
              <img src={Art3} alt="" />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={Art4} alt="" />
              <img src={ArtNumb4} alt="" height={68} />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={ArtNumb1} alt="" height={68} />
              <img src={Art1} alt="" />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={Art2} alt="" />
              <img src={ArtNumb2} alt="" height={68} />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={ArtNumb3} alt="" height={68} />
              <img src={Art3} alt="" />
            </div>
            <div className="embla__slide w-fit flex flex-col gap-[12px] items-end flex-shrink-0">
              <img src={Art4} alt="" />
              <img src={ArtNumb4} alt="" height={68} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Arts;
