import { Title } from "@/components/Title";
import { StarIcon } from "@/components/Icon";
import IntroShape from "/home/intro-shape.svg";

const Intro = () => {
  return (
    <div className="flex items-start justify-between container mx-auto">
      <div>
        <Title>Ý nghĩa triển lãm</Title>
        <div className="h-[125px] relative  mt-[36px] mb-[22px]">
          <div className="absolute top-0 left-0">
            <StarIcon />
          </div>
          <div className="absolute bottom-0 right-0">
            <StarIcon />
          </div>
        </div>
        <p className="w-[493px] text-base font-medium leading-6 text-justify">
          Dị Diện mở ra những đối thoại về: Một hiện thực hỗn lai (theo đó, thế
          giới thực và ảo ngày càng bện quyện); ý nghĩa của dữ liệu trong thời
          đại của thuật toán (suy tư lại về văn bản, hình ảnh và âm thanh trong
          thời đại ý nghĩa được tạo ra bởi dữ liệu hóa và học máy); chủ nghĩa
          hậu nhân bản (nhìn nhận ý nghĩa con người trong thời đại của máy móc
          thông minh) cũng như sự kết nối và cảm thông (giải nén các ý tưởng về
          ký ức số, tính kết nối và đối thoại). Và cuối cùng, nếu như lập trình
          và thuật toán cũng được coi như những biểu tượng đầy chất thơ thì liệu
          chúng ta có thể hiểu về thẩm mỹ của chúng như thế nào?
        </p>
      </div>
      <div className="flex flex-col items-end">
        <div className="mb-[56px]">
          <StarIcon />
        </div>
        <p className="w-[493px] text-base font-medium leading-6 text-justify mb-[142px]">
          Khác với các triển lãm số thường tìm cách trình bày những điểm gặp gỡ
          giữa nghệ thuật và công nghệ, Dị Diện hướng đến việc diễn giải sự hiện
          diện rộng rãi của công nghệ mới đang tác động đến mối quan hệ giữa
          người và người với thế giới xung quanh.
        </p>
        <div>
          <img src={IntroShape} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
