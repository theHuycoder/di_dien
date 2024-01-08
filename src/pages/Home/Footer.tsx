const links = [
  {
    title: "Dịch vụ",
    links: [
      {
        title: "Nghiên cứu trải nghiệm",
      },
      {
        title: "Thiết kế giao diện",
      },
      {
        title: "Thiết kế đồ họa",
      },
    ],
  },
  {
    title: "Điều khoản",
    links: [
      {
        title: "Bảo mật",
      },
      {
        title: "Chính sách",
      },
      {
        title: "Rủi ro",
      },
    ],
  },
  {
    title: "Thông tin liên hệ",
    links: [
      {
        title: "0234.6868.86",
      },
      {
        title: "contact_dx@vnpt.vn",
      },
      {
        title: "https://ux.vnpt.vn/vi",
      },
      {
        title: "97A Nguyễn Chí Thanh, Đống Đa, Hà Nội i",
      },
    ],
  },
  {
    title: "Doanh nghiệp",
    links: [
      {
        title: "Về chúng tôi",
      },
      {
        title: "Trở thành đối tác",
      },
      {
        title: "Liên hệ trợ giúp",
      },
      {
        title: () => {
          return (
            <button className="flex justify-center w-[150px] h-[36px] items-center bg-[#E2D9FC] rounded-[100px]">
              👋 Tuyển dụng
            </button>
          );
        },
      },
    ],
  },
];

const Footer = () => {
  return (
    <div className="py-[60px]  flex justify-between items-start container">
      {links.map((link) => {
        return (
          <div key={link.title} className="flex flex-col gap-[20px]">
            <div className="pb-[8px] w-[170px] border-b border-b-[#F2F2F2]">
              <p className="text-base font-bold">{link.title}</p>
            </div>
            {link.links.map((link, idx) => {
              return (
                <p
                  key={idx}
                  className="text-[14px] font-medium text-neutral-500"
                >
                  {typeof link.title === "function" ? link.title() : link.title}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
