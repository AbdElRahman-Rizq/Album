'use client'
import Image from 'next/image'
import Slider from "react-slick"

import logo1 from "@/assets/images/logo1.png";
import logo2 from "@/assets/images/logo2.png";
import logo3 from "@/assets/images/logo3.png";
import logo4 from "@/assets/images/logo4.png";

const ClientItem = ({ imgSrc }) => (
  <div className="client-item">
    <figure>
      <Image src={imgSrc} alt="Client Logo" width={180} height={200} />
    </figure>
  </div>
);

const ClientSection = () => {
  const logos = [logo1, logo2, logo3, logo4, logo1, logo2];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="client-section">
      <div className="container-fluid">
        <div className="client-wrap client-slider secondary-bg">
          <Slider {...settings}>
            {logos.map((logo, index) => (
              <ClientItem key={index} imgSrc={logo} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ClientSection;
