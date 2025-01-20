"use client";
const SliderItem = ({ backgroundImage }) => {


  return (
    <div
      className="slider-item"
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />


    </div>
  );
};

export default SliderItem;
