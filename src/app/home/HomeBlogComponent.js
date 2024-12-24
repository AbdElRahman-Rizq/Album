'use client'
import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useHomeBlog } from "@/home/HomeBlogProvider";
import HomeSliderSection from "@/components/slider/HomeSliderSection";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import CustomButton from "@/components/CustomButton";
import TopNotchDeals from "@/components/TopNotchDeals";
import CallbackSection from "@/components/CallbackSection";
import AdventureAndActivity from "@/components/AdventureAndActivity";
import SpecialTravelOffer from "@/components/SpecialTravelOffer";
import ClientSection from "@/components/ClientSection";
import TestimonialSection from "@/components/TestimonialSection";

// Import images
import icon12 from '@/assets/images/icon12.png';
import icon13 from '@/assets/images/icon13.png';
import icon14 from '@/assets/images/icon14.png';
import img12 from '@/assets/images/img12.jpg';
import img13 from '@/assets/images/img13.jpg';
import img14 from '@/assets/images/img14.jpg';
import img15 from '@/assets/images/img15.jpg';
import img24 from '@/assets/images/img24.jpg';
import SubscribeSection from "@/components/SubscribeSection";
import { ADDRESS, INFO_MAILE, PHONE1 } from "@/constants/globals";
import { api_url } from "@/constants/base_url";


const HomeBlogComponent = () => {
  const { langs, lang, blog } = useHomeBlog();
  console.log(blog, 'bloggg')
  console.log(langs, 'langss')
  return (
    <>
      <main id="content" className="site-main">
        <HomeSliderSection />
        <section className="package-section recommended">
          <div className="container-fluid">
            <SectionHeading
              title={blog?.sub_card_2?.title || "EXPLORE GREAT PLACES"}
              headingTextAlignment="text-center"
              containerTextsStyle="col-lg-8 offset-lg-2 mt-5"
            >
              <h4>
                {blog?.sub_card_2?.content?.split("-.-")[0] ||
                  "Your recently viewed and recommended trips"}
              </h4>
            </SectionHeading>
            <div className="package-inner">
              <div className="row px-lg-5">
                {blog?.data?.data?.data.map((item) => (
                  <PackageCard
                    recommended={true}
                    people={item.number_of_people}
                    location={item.location}
                    rating={item.rating}
                    reviews={item.number_of_reviews}
                    duration={item.duration_days}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    id={item?.id}
                  >
                    {/* <span>{item.price} </span> / per person */}
                    {/* {item?.HasOffer&&(
                      <div className="package-offer">Discount %</div>
                    )} */}
                  </PackageCard>
                ))}
              </div>
              <CustomButton href={"/tours"}>
                {blog?.sub_card_2?.content?.split("-.-")[2] ||
                  "VIEW ALL PACKAGES"}
              </CustomButton>
            </div>
          </div>
        </section>

        <section className="destination-section home">
          <div className="container-fluid px-lg-5">
            <TopNotchDeals />
          </div>
        </section>

        <section className="package-section recommended">
          <div className="container-fluid ">
            <SectionHeading
              title={blog?.sub_card_2?.title || "EXPLORE GREAT PLACES"}
              headingTextAlignment="text-center"
              containerTextsStyle="col-lg-8 offset-lg-2 mt-5"
            >
              <h4>
                {blog?.sub_card_2?.content?.split("-.-")[1] ||
                  "Book now and save up to 15% with our Last Minute Deals"}
              </h4>
            </SectionHeading>
            <div className="package-inner">
              <div className="row px-lg-5">
                {blog?.data?.data?.data.map((item) => (
                  <PackageCard
                    recommended={true}
                    people={item.number_of_people}
                    location={item.location}
                    rating={item.rating}
                    reviews={item.number_of_reviews}
                    duration={item.duration_days}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    id={item?.id}
                  >
                    {/* <del> {item.oldPrice}</del>
                    <span>
                      {" "}
                      <ins>{item.price}</ins>{" "}
                    </span> */}
                    {/* {item?.HasOffer &&(
                      <span className="text-danger"> {item.offer}% OFF</span>
                    )} */}
                  </PackageCard>
                ))}
              </div>
              <CustomButton href={"/tours"}>
                {blog?.sub_card_2?.content?.split("-.-")[2] ||
                  "VIEW ALL PACKAGES"}
              </CustomButton>
            </div>
          </div>
        </section>
        <CallbackSection />

        <section className="activity-section">
          <div className="container-fluid">
            <AdventureAndActivity />
          </div>
        </section>

        <section className="special-section">
          <div className="container">
            <SpecialTravelOffer />
          </div>
        </section>

        <section className="best-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <SectionHeading
                  title={blog?.sub_card_7?.title || "OUR TOUR GALLERY"}
                >
                  <h2>
                    {blog?.sub_card_7?.content?.split("-.-")?.[0] ||
                      "BEST TRAVELER'S SHARED PHOTOS"}
                  </h2>
                  <p>
                    {blog?.sub_card_7?.content?.split("-.-")?.[1] ||
                      `Enjoy personalized service with our dedicated team, ensuring
                    your travel experience is seamless and memorable. Our
                    professional guides and 24/7 support are committed to
                    providing exceptional, customized service for
                    every traveler.`}
                  </p>
                </SectionHeading>

                <figure className="gallery-img">
                  <Image
                    src={
                      blog?.sub_card_7?.image[0]
                        ? `${api_url}${blog?.sub_card_7?.image[0]}`.replace(
                          "/api/",
                          "/storage/"
                        )
                        : img12
                    }
                    width="600"
                    height="200"
                    alt="Gallery"
                  />
                </figure>
              </div>
              <div className="col-lg-7">
                <div className="row">
                  <div className="col-sm-6">
                    <figure className="gallery-img">
                      <Image
                        src={
                          blog?.sub_card_7?.image[1]
                            ? `${api_url}${blog?.sub_card_7?.image[1]}`.slice(0, -4)
                            : img13
                        }
                        width="600"
                        height="200"
                        alt="Gallery"
                      />
                    </figure>
                  </div>
                  <div className="col-sm-6">
                    <figure className="gallery-img">
                      <Image
                        src={
                          blog?.sub_card_7?.image[2]
                            ? `${api_url}${blog?.sub_card_7?.image[2]}`.slice(0, -4)
                            : img14
                        }
                        width="600"
                        height="200"
                        alt="Gallery"
                      />
                    </figure>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <figure className="gallery-img">
                      <Image
                        src={
                          blog?.sub_card_7?.image[3]
                            ? `${api_url}${blog?.sub_card_7?.image[3]}`.slice(0, -4)
                            : img15
                        }
                        width="800"
                        height="200"
                        alt="Gallery"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ClientSection />

        <SubscribeSection />
        <TestimonialSection />
        <section className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div
                  className="contact-img"
                  style={{
                    backgroundImage: blog?.sub_card_10?.image?.[0]
                      ? `url(${api_url}${blog?.sub_card_10?.image?.[0]})`.replace(
                        "/api/",
                        "/storage/"
                      )
                      : `url(${img24})`,
                  }}
                ></div>
              </div>
              <div className="col-lg-8">
                <div className="contact-details-wrap">
                  <div className="row">
                    <div className="col-sm-4 height-max">
                      <div className="contact-details">
                        <div className="contact-icon">
                          <Image src={icon12.src} alt="" width="400" height="200" />
                        </div>
                        <ul>
                          <li>
                            <a
                              href={`mailto:${blog?.sub_card_10?.content?.split("-.-")?.[0] ||
                                INFO_MAILE
                                }`}
                            >
                              {blog?.sub_card_10?.content?.split("-.-")?.[0] ||
                                INFO_MAILE}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-4 height-max">
                      <div className="contact-details">
                        <div className="contact-icon">
                          <Image src={icon13} alt="" width="200" height="200" />
                        </div>
                        <ul>

                          {blog?.sub_card_10?.content
                            ?.split("-.-")
                            ?.slice(3)
                            .map((item, index) => (
                              <li key={index}>
                                <a
                                  href={`tel:${item?.trim() || PHONE1
                                    }`}
                                >
                                  {item?.trim() || PHONE1}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-4 height-max">
                      <div className="contact-details">
                        <div className="contact-icon">
                          <Image src={icon14} alt="" width="400" height="200" />
                        </div>
                        <ul>
                          <li>
                            {blog?.sub_card_10?.content?.split("-.-")?.[1] ||
                              ADDRESS}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact-btn-wrap">
                  <h3>
                    {blog?.sub_card_10?.title ||
                      "LET'S JOIN US FOR MORE UPDATE !!"}
                  </h3>
                  <Link href="/contact" className="button-primary">
                    {blog?.sub_card_10?.content?.split("-.-")?.[2] ||
                      "LEARN MORE"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <WhatsAppButton /> */}
    </>
  );
};

export default HomeBlogComponent;
