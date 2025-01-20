"use client";
import ClientItem from "./ClientItem";
import logo7 from "@/assets/images/logo7.png";
import logo8 from "@/assets/images/logo8.png";
import logo9 from "@/assets/images/logo9.png";
import logo10 from "@/assets/images/logo10.png";
import logo11 from "@/assets/images/logo11.png";
import Slider from "react-slick";
import { useHomeBlog } from "@/providers/HomeBlogContext";

const clients = [logo7, logo8, logo9, logo10, logo11, logo8];

function ClientSection() {
  const { blog, isBlogLoading } = useHomeBlog();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  };

  return (
    <div className="client-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="section-heading text-center">
              <h5 className="dash-style">
                {blog?.sub_card_12?.title || "OUR ASSOCIATES"}
              </h5>
              <h2>
                {blog?.sub_card_12?.content?.split("-.-")?.[0] ||
                  "PARTNER'S AND CLIENTS"}
              </h2>
              <p style={{ fontSize: "2rem" }}>
                {blog?.sub_card_12?.content?.split("-.-")?.[1] ||
                  `To become a leader and trusted partner in the tourism industry
                in Egypt and the Middle East.`}
              </p>
            </div>
          </div>
        </div>
        <div className="client-wrap client-slider">
          <div className="slider-container">
            <Slider {...settings}>
              {clients.map((client, index) => (
                <ClientItem key={index} logo={client} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSection;
