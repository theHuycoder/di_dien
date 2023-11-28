const Contact = () => {
  return (
    <div className="container pt-20">
      <div className="flex flex-col items-center gap-4">
        <p className="text-[14px] font-medium text-[#818181]">
          Bạn thây sự kiện này thú vị ?
        </p>
        <h2 className="text-[40px] text-black font-bold leading-[60px] text-center w-[350px]">
          Liên hệ ngay với đội ngũ chúng tôi!
        </h2>
        <div className="flex items-center justify-between rounded-[100px] pl-[16px] pr-[4px] py-[4px] border">
          <input
            type="text"
            className="border-0 outline-0 bg-transparent text-[12px] font-medium leading-[20px] text-black"
            placeholder="Nhập email tại đây"
          />
          <button className="flex items-center p-[16px] rounded-full bg-[#5F6FFC] w-[130px] h-[40px]">
            Gửi thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
