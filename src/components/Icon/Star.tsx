const Star = ({ width = 59, height = 59, viewBox = "0 0 59 59" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M58.0601 0.939972L7.37902e-05 0.939974L7.62939e-05 58.22L57.1201 58.22C57.1201 38.76 57.1201 19.38 57.1201 -3.04761e-05L58.0701 0.939972L58.0601 0.939972Z"
        fill="white"
      />
    </svg>
  );
};

export default Star;
