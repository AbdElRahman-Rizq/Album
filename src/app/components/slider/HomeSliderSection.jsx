'use client'
import { useState } from "react";
import Slider from "react-slick";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import SliderItem from "./SliderItem";
import Modal from "../shared/Modal";
import BookingForm from "../BookingForm";
import { useHomeBlog } from "@/home/HomeBlogProvider";
import { toast } from "react-toastify";
import { api_url } from "@/constants/base_url";
import "./sliderArrows.css";

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
   
  };

  const { blog } = useHomeBlog();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: () =>
      axios.get(`${api_url}destinations`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      axios.post(`${api_url}inquiries`, data, {
        headers: {
          Accept: "application/json",
        },
      }),
    onSuccess: () => {
      toast.success("We have received your inquiry, we will be in touch with you soon");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong, please try again");
    },
  });

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <section className="home-slider-" style={{ position: "relative" }}>
      <Slider {...settings} className="home-slider">
        {blog?.sub_card_1?.content?.split("-.-").map((item, index) => (
          <SliderItem
            key={index}
            backgroundImage={`${api_url}${blog?.sub_card_1?.image[index]}`.replace(
              "/api/",
              "/storage/"
            )}
            title={item}
          />
        ))}
      </Slider>

      <div className="fixed-form-content">
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
                {isLoading ? (
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
          style={{ position: "absolute", bottom: "10%", width: "100%" }}
        >
          <div className="container-fluid">
            <div className="trip-search-inner d-flex justify-content-center">
              <div className="input-group col-md-5">
                <select
                  name="travel-destination"
                  value={selectedDestination}
                  onChange={handleDestinationChange}
                >
                  {isLoading ? (
                    <option>Loading destinations...</option>
                  ) : error ? (
                    <option>Error loading destinations</option>
                  ) : (
                    <>
                      <option value="" disabled>
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
              <div className="input-group col-md-5">
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
    </section>
  );
};

export default HomeSliderSection;
