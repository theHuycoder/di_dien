import ArtistImg from "/home/artist.png";
import { QuoteIcon } from "@/components/Icon";
import { Title } from "@/components/Title";
import ArtistShape from "/home/artist-shape.svg";
import useEmblaCarousel from "embla-carousel-react";

const artists = [
  {
    name: "Ryoji Ikeda",
    title: "Nghệ sĩ hàng đầu quốc tế",
    img: ArtistImg,
    quote:
      "Dị Diện hướng đến việc diễn giải sự hiện diện rộng rãi của công nghệ mới đang tác động đến mối quan hệ giữa người và người với thế giới xung quanh.",
  },
  {
    name: "Ryoji Ikeda",
    title: "Nghệ sĩ hàng đầu quốc tế",
    img: ArtistImg,
    quote:
      "Dị Diện hướng đến việc diễn giải sự hiện diện rộng rãi của công nghệ mới đang tác động đến mối quan hệ giữa người và người với thế giới xung quanh.",
  },
  {
    name: "Ryoji Ikeda",
    title: "Nghệ sĩ hàng đầu quốc tế",
    img: ArtistImg,
    quote:
      "Dị Diện hướng đến việc diễn giải sự hiện diện rộng rãi của công nghệ mới đang tác động đến mối quan hệ giữa người và người với thế giới xung quanh.",
  },
];

const ArtistSlide = ({ name, title, img, quote }: any) => {
  return (
    <div className="flex flex-1 items-stretch gap-[40px] flex-shrink-0">
      <div className="w-[360px] h-[406px] flex-shrink-0 rounded-2xl overflow-hidden">
        <img src={img} alt="" />
      </div>
      <div className="flex-auto relative pl-[100px] pt-[40px]">
        <div className="absolute top-0 left-0">
          <QuoteIcon />
        </div>
        <div className="flex flex-col justify-between h-full max-w-[600px]">
          <p className="text-[28px] font-bold leading-[40px]">{quote}</p>
          <div>
            <p className="text-[20px] font-semibold">{name}</p>
            <p className="text-[14px] text-neutral-500 font-medium">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Artist = () => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: true,
  });

  return (
    <div className="container mx-auto relative">
      <div className="flex items-center justify-between">
        <Title>Họa sĩ sáng tác</Title>
      </div>
      <div className="embla py-[72px] relative">
        <div className="absolute bottom-[72px] right-0">
          <img src={ArtistShape} alt="" />
        </div>
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex items-center">
            {artists.map((artist, idx) => (
              <div
                style={{
                  flex: "0 0 100%",
                }}
                key={idx}
                className="embla__slide"
              >
                <ArtistSlide {...artist} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
