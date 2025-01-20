"use client";

import icon15 from "@/assets/images/icon15.png";
import icon16 from "@/assets/images/icon16.png";
import icon17 from "@/assets/images/icon17.png";
import img25 from "@/assets/images/img25.jpg";
import IneerBanner from "@/components/IneerBanner";
import SectionHeading from "@/components/SectionHeading";

import AboutService from "./components/AboutService";
import AboutVideo from "./components/AboutVideo";
import ClientSection from "@/components/ClientSection";
import CallbackSection from "@/components/CallbackSection";
import { useEffect, useState } from "react";
import { useHomeBlog } from "@/providers/HomeBlogContext";

const defaultServices = [
  {
    icon: icon15,
    title: "AFFORDABLE PRICE",
    description:
      "Discover Egypt with our budget-friendly travel packages, offering modern transport, expert guides, and 24/7 support.",
  },
  {
    icon: icon16,
    title: "BEST DESTINATION",
    description:
      "Discover the beauty of Egypt with our customizable travel packages. Enjoy top-notch services and unforgettable experiences, all within your budget.",
  },
  {
    icon: icon17,
    title: "PERSONAL SERVICE",
    description:
      "Enjoy personalized travel experiences with expert guides and 24/7 support.",
  },
];

const About = () => {
  const { blog, isBlogLoading } = useHomeBlog();
  const [services, setServices] = useState(defaultServices);
  useEffect(() => {
    if (blog?.sub_card_11?.content) {
      setServices((prevServices) =>
        prevServices.map((service, index) => ({
          ...service,
          title:
            blog?.sub_card_11?.content?.split("-.-")?.[index * 2 + 3] ||
            service.title,
          description:
            blog?.sub_card_11?.content?.split("-.-")?.[index * 2 + 4] ||
            service.description,
        }))
      );
    }
  }, [blog]);

  return (
    <>
      <IneerBanner bannerName={"About us"} />
      <section className="about-section about-page-section">
        <div className="about-service-wrap">
          <div className="container">
            <SectionHeading
              heading={blog?.sub_card_11?.title || "Why Album Travel"}
              subheading={
                blog?.sub_card_11?.content?.split("-.-")?.[0] ||
                "We are committed to curate and flawlessly execute travel experiences."
              }
              description1={
                blog?.sub_card_11?.content?.split("-.-")?.[1] ||
                "Established in 2006, Album Travel started its journey with just one goal: to offer remarkable travel experiences."
              }
              description2={
                blog?.sub_card_11?.content?.split("-.-")?.[2] ||
                "Our exceptional attention to detail makes us the preferred choice."
              }
            />
            <div className="about-service-container">
              <div className="row">
                {services.map((service, index) => (
                  <div className="col-lg-4" key={index}>
                    <AboutService
                      icon={service.icon}
                      title={service.title}
                      description={service.description}
                    />
                  </div>
                ))}
              </div>
            </div>
            <AboutVideo
              backgroundImage={img25}
              videoId="IUN664s7N-c"
              videoUrl=""
            />
          </div>
        </div>
        <ClientSection />
        <CallbackSection />
      </section>
    </>
  );
};

export default About;
