"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import SliderItem from "./SliderItem";
import Modal from "../shared/Modal";
import BookingForm from "../BookingForm";
import Loading from "../shared/Loading/Loading";

import { toast } from "react-toastify";
import { api_url } from "@/constants/base_url";

import "./sliderArrows.css";
import { getTokenFromCookies } from "../../../utils/cookieUtils";
import { useHomeBlog } from "@/providers/HomeBlogContext";

const HomeSliderSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: (
      <div>
        <div className="next-slick-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 -960 960 960" width="24">
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
        </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="next-slick-arrow rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 -960 960 960" width="24">
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
        </div>
      </div>
    ),
  };

  const { blog, isBlogLoading } = useHomeBlog();
  const [isOpen, setIsOpen] = useState(false);
  const [sliderTitle, setTitle] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const { data, error, isLoading: isDestinationsLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: () =>
      axios.get(`${api_url}destinations`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
        },
      }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      axios.post(`${api_url}inquiries`, data, {
        headers: {
          Accept: "application/json",
        },
      }),
    onSuccess: () => {
      toast.success(
        "We have received your inquiry, we will be in touch with you soon"
      );
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong, please try again");
    },
  });

  useEffect(() => {
    setTitle(blog?.sub_card_1?.content);
  }, [blog?.sub_card_1?.content]);

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  if (isBlogLoading) {
    return (
      <section className="home-slider-loading" style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loading color="#007bff" />
      </section>
    );
  }

  return (
    <section className="home-slider-" style={{ position: "relative" }}>
      <div className="overlay" style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "101vh", // Adjust height as needed
        backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent black
        zIndex: 99, // Ensure it appears above other content
        pointerEvents: 'none' // Prevent it from blocking interactions
      }}></div>


      <div className="banner-content" style={{
        position: "absolute",        
        top: "45%",
        zIndex: "1000",
        color: "white"
      }}>
        <div className="container">

          <h1 className="banner-title" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>{sliderTitle}</h1>

        </div>


      </div>

      {
        blog?.sub_card_1?.image?.length > 0 ? (
          <Slider {...settings} className="home-slider">

            {blog?.sub_card_1?.image?.map((item, index) => (
              <div key={index}>
                <SliderItem
                  backgroundImage={`${api_url}${blog?.sub_card_1?.image[index]}`.replace(
                    "/api/",
                    "/storage/"
                  )}




                />
                <div className="overlay"></div>
              </div>
            ))}
          </Slider>
        ) : (
          <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            No slider content available
          </div>
        )
      }

      <div className="fixed-form-content" style={{ zIndex: "1000" }}>
        {isOpen && (
          <Modal isAppear onClose={() => setIsOpen(false)}>
            <BookingForm
              isPending={isPending}
              title="TRAVELLING AROUND THE WORLD"
              inquire={mutate}
              inquireData={{
                from_date: selectedDate,
                destination_id: selectedDestination,
              }}
            >
              <select
                name="travel-destination"
                value={selectedDestination}
                onChange={handleDestinationChange}
              >
                {isDestinationsLoading ? (
                  <option>Loading destinations...</option>
                ) : error ? (
                  <option>Error loading destinations</option>
                ) : (
                  <>
                    <option value="">Select your destination</option>
                    {data?.data?.data?.map((destination) => (
                      <option key={destination.id} value={destination.id}>
                        {destination.name}
                      </option>
                    ))}
                  </>
                )}
              </select>

            </BookingForm>
          </Modal>
        )}

        <div
          className="trip-search-section"
          style={{ position: "absolute", bottom: "10%", width: "100%", zIndex: "1000", }}
        >
          <div className="container-fluid">
            <div className="trip-search-inner d-flex justify-content-center" style={{ cursor: "pointer" }}>
              <div className="input-group col-md-5" style={{ cursor: "pointer" }}>
                <select
                  name="travel-destination"
                  value={selectedDestination}
                  onChange={handleDestinationChange}
                >
                  {isDestinationsLoading ? (
                    <option>Loading destinations...</option>
                  ) : error ? (
                    <option>Error loading destinations</option>
                  ) : (
                    <>
                      <option value="" disabled style={{ cursor: "pointer" }}>
                        Select your destination
                      </option>
                      {data?.data?.data?.map((destination) => (
                        <option key={destination.id} value={destination.id}>
                          {destination.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div className="input-group col-md-5" style={{ cursor: "pointer" }}>
                <input
                  className="input-date-picker"
                  type="date"
                  name="s"
                  placeholder="when?"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="input-group col-md-2">
                <input
                  type="submit"
                  name="travel-search"
                  value="INQUIRE"
                  onClick={() => setIsOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default HomeSliderSection;
