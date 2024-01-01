import TextInput from "@/components/TextInput";
import { useForm, Controller } from "react-hook-form";

const TicketForm = ({ onPay }: any) => {
  const { control } = useForm({
    defaultValues: {
      name: "abc",
    },
  });

  return (
    <div className="flex justify-between gap-[40px] p-[48px] text-black items-stretch">
      <div className="min-w-[383px] max-w-[383px]">
        <div className="border-b border-b-[#E1E1EA] border-dashed pb-[8px] mb-[16px]">
          <h2 className="text-[32px] font-bold leading-[40px] uppercase mb-[4px]">
            Thông tin của bạn
          </h2>
          <h6 className="text-[12px] font-medium leading-[20px] text-[#817D82]">
            Cung cấp thông tin chính xác để ban tổ chức gửi xác nhận đơn hàng
          </h6>
        </div>
        <form className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-bold leading-[22px] uppercase">
              Họ tên
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput placeholder="test" {...field} />
              )}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-bold leading-[22px] uppercase">
              Email
            </label>
            <TextInput placeholder="test" />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-bold leading-[22px] uppercase">
              Số điện thoại
            </label>
            <TextInput placeholder="test" />
          </div>
        </form>
      </div>
      <div className="w-[1px] bg-[#E1E1EA]"></div>
      <div className="min-w-[383px] max-w-[383px] flex flex-col justify-between">
        <div>
          <div className="border-b border-b-[#E1E1EA] border-dashed pb-[8px] mb-[16px]">
            <h2 className="text-[32px] font-bold leading-[40px] uppercase mb-[4px]">
              Đơn hàng của bạn
            </h2>
            <h6 className="text-[12px] font-medium leading-[20px] text-[#817D82]">
              Vui lòng kiểm tra đúng số lượng vé đơn hàng và thông tin cá nhân
            </h6>
          </div>
          <form className="flex flex-col w-full gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-bold leading-[22px] uppercase">
                Số lượng vé
              </label>
              <TextInput placeholder="test" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-bold leading-[22px] uppercase">
                Tổng tiền
              </label>
              <p className="text-[14px] font-bold leading-[22px] uppercase text-[#601FEB]">
                250.000
              </p>
            </div>
            <div>
              <label
                className="flex items-start gap-[8px] text-[12px] font-medium leading-[20px]"
                htmlFor="check"
              >
                <input
                  id="check"
                  type="checkbox"
                  className="w-[18px] h-[18px] flex-shrink-0 mt-[4px]"
                  style={{
                    accentColor: "#601FEB",
                  }}
                />
                <span>
                  Tôi đã đọc các điều khoản dịch vụ và đồng ý với tất cả các
                  điều khoản được đưa ra cũng như bất kỳ điều khoản nào được
                  chỉnh sửa sau này.
                </span>
              </label>
            </div>
          </form>
        </div>
        <button
          onClick={onPay}
          className="w-full flex items-center justify-center h-[40px] text-white bg-[#601FEB]"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default TicketForm;
