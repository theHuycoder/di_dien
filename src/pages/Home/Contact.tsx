const Contact = ({ onClick }: any) => {
  return (
    <div className="container pt-20 text-white relative z-20 h-full">
      <div className="flex flex-col items-center gap-12 justify-center h-full ">
        <h6 className="text-6xl font-semibold text-white text-center max-w-[800px] leading-[80px]">
          Bạn đã sẵn sàng trải nghiệm một thế giới khác
        </h6>
        <button
          onClick={onClick}
          className="bg-white text-purple-950 text-xl font-bold py-4 px-8 rounded-xl"
        >
          Đặt vé ngay
        </button>
      </div>
    </div>
  );
};

export default Contact;
