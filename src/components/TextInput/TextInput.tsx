import { forwardRef } from "react";

const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`
        w-full
        text-[14px] leading-[22px] border-0
        outline-0 bg-[#601FEB1A]
        py-[8px] px-[16px]
         ${className}
      `}
      {...props}
    />
  );
});

export default TextInput;
