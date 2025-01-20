"use client";
import Image from "next/image";
import Slider from "react-slick";
import { api_url } from "@/constants/base_url";

import img23 from "@/assets/images/img23.jpg";
import { useHomeBlog } from "@/providers/HomeBlogContext";

const TestimonialItem = ({ imgSrc, quote, name, company }) => (
  <div className="testimonial-item text-center">
    <figure className="testimonial-img">
      <Image src={imgSrc} alt={name} width={150} height={150} />
    </figure>
    <div className="testimonial-content">
      <p>{quote}</p>
      <cite>
        {name}
        <span className="company">{company}</span>
      </cite>
    </div>
  </div>
);

const TestimonialSection = () => {
  const { blog } = useHomeBlog();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      className="testimonial-section"
      style={{ backgroundImage: `url(${img23})` }}
    >
      <div className="container-fluid">
        <div className="row my-4">
          <div className="col-lg-10 offset-lg-1">
            <Slider
              className="testimonial-inner testimonial-slider"
              {...settings}
            >
              {blog?.sub_card_9?.content?.split("-.-")?.map((item, index) => (
                <TestimonialItem
                  key={index}
                  imgSrc={`${api_url}${blog?.sub_card_9?.image?.[index]}`.replace(
                    "/api/",
                    "/storage/"
                  )}
                  quote={item.split("@.@")?.[0]}
                  name={item.split("@.@")?.[1]}
                  company={item.split("@.@")?.[2]}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
