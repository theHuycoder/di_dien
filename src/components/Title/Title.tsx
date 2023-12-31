const Title = ({ children, className = '' ,...props }: any) => {
  return (
    <h2 className={`font-bold text-[60px] text-white leading-[68px] ${className}`} {...props}>
      {children}
    </h2>
  );
};

export default Title;
