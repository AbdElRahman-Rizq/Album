import React from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { api_url } from "../../constants/base_url";

function ImagesSlider({ images = [] }) {
  if (!images || images.length === 0) {
    return null;
  }

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <div style={{ position: 'relative', height: '70px', width: '100px' }}>
            <Image
              src={`${api_url}${images[i]}`.replace("/api/", "/storage/")}
              alt={`thumbnail-${i}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100px, 100px"
            />
          </div>
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container" style={{ width: "60vw", height: "75vh" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative', height: '65vh' }}>
            <Image
              src={`${api_url}${image}`.replace("/api/", "/storage/")}
              alt={`slide-${index}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 60vw, 60vw"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImagesSlider;
