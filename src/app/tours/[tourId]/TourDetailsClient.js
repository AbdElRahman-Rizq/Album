'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  IoHourglassOutline,
  IoEarth,
  IoPeople,
  IoCalendarOutline
} from 'react-icons/io5';
import Loading from '@/components/shared/Loading/Loading';
import style from './TourDetails.module.css';
import Modal from '@/components/shared/Modal/Modal';
import BookingForm from '@/components/BookingForm';
import ImagesSlider from '@/components/shared/ImagesSlider';
import { api_url } from '@/constants/base_url';
import ItineraryCard from '../../../components/TourDetailsComponents/ItineraryCard/ItineraryCard';
import PricesCard from '../../../components/TourDetailsComponents/PricesCard/PricesCard';
import { useLanguage } from "@/providers/LanguageContext";
import { fetchTourDetails, fetchBlogs } from '@/utils/tourApi';
import { useHomeBlog } from '@/providers/HomeBlogContext';

const TourDetailsClient = ({ slug }) => {
  const { language } = useLanguage();
  const [currentImage, setCurrentImage] = useState(null);
  const [openImageSlider, setOpenImageSlider] = useState(false);
  const [includeExclude, setIncludeExclude] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [overviewCard, setOverviewCard] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [cabinData, setCabinData] = useState(null);
  const { lang } = useHomeBlog();
  console.log("logsss", lang);



  // Use React Query to fetch tour details
  const {
    data: tourDetails,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['tourDetails', slug, language],
    queryFn: () => fetchTourDetails(
      slug,
      lang
    ),

    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: true  // Ensure the query can be manually triggered
  });

  // Refetch when language changes
  useEffect(() => {
    const fetchData = async () => {
      await refetch(); // Refetch tour details
      await fetchBlogs(); // Fetch blogs to ensure we have the latest data
    };
    fetchData();
  }, [language, refetch]);

  // Parse subCard data
  useEffect(() => {
    if (tourDetails?.subCard) {
      try {
        console.log("rizq: ", tourDetails.subCard);

        const subCardData = typeof tourDetails.subCard == 'string'
          ? JSON.parse(tourDetails.subCard)
          : tourDetails.subCard;

        // Reset states before parsing
        setIncludeExclude(null);
        setGallery(null);
        setOverviewCard(null);
        setCardData(null);
        setCabinData(null);

        Object.entries(subCardData).forEach(([key, value]) => {
          if (key.startsWith("sub_") && value?.title === "include&exclude") {
            const parsedContent = typeof value.content === 'string'
              ? JSON.parse(value.content)
              : value.content;
            setIncludeExclude(parsedContent);
          }

          if (key.startsWith("sub_") && value?.title === "images") {
            setGallery(value);
            setCurrentImage(value.image[0]);
          }

          if (key.startsWith("sub_") && value?.title === "overview") {
            setOverviewCard(typeof value.content === 'string'
              ? JSON.parse(value.content)
              : value.content);
          }

          if (key.startsWith("sub_") && value?.title == "cruise") {
            setCardData(typeof value.content === 'string'
              ? JSON.parse(value.content)
              : value.content);
          }

          if (key.startsWith("sub_") && value?.title === "cabin") {
            setCabinData(typeof value.content === 'string'
              ? JSON.parse(value.content)
              : value.content);
          }
        });
      } catch (error) {
        console.error("Error parsing subCard:", error);
      }
    }
    console.log("Gallery: ", gallery);

  }, [tourDetails]);

  // Handle loading and error states
  if (isLoading) {
    return <Loading />;
  }

  if (error || !tourDetails?.tour) {
    return (
      <div className={style.container}>
        <h1>Error Loading Tour Details</h1>
        <p>{error?.message || 'Unable to fetch tour details'}</p>
      </div>
    );
  }

  const {
    tour,
    tourDays,
    pricing
  } = tourDetails;

  return (
    <div className={style.container}>
      <h1>{tour?.title}</h1>
      <div className={style.details}>
        <div className={style.leftSection}>
          <div className={style.images}>
            {gallery?.image ? (
              <>
                <div
                  style={{
                    backgroundImage: `url(${`${api_url}${currentImage}`.replace(
                      "/api/",
                      "/storage/"
                    )})`,
                  }}
                ></div>

                {gallery?.image.map((image, index) => (
                  <div
                    key={index}
                    className={currentImage === image ? style.active : undefined}
                    style={{
                      backgroundImage: `url(${`${api_url}${image}`.replace(
                        "/api/",
                        "/storage/"
                      )})`,
                    }}
                    onClick={() => setCurrentImage(image)}
                  ></div>
                ))}
                {gallery?.image.length > 2 && (
                  <div
                    style={{
                      backgroundImage: `url(${`${api_url}${gallery?.image[2]}`.replace(
                        "/api/",
                        "/storage/"
                      )})`,
                    }}
                    onClick={() => {
                      setCurrentImage(gallery?.image[2]);
                      setOpenImageSlider(true);
                    }}
                  >
                    <p>+{gallery?.image.length - 2} Photos</p>
                  </div>
                )}
              </>
            ) : (
              <div>No images available</div>
            )}
          </div>

          <div className={style.overview}>
            <h2>Overview</h2>
            {overviewCard ? (
              <>
                <div>
                  <OverviewCard
                    icon={<IoHourglassOutline />}
                    text="Schedule"
                    subText={overviewCard?.scheduleDays}
                    details={overviewCard?.scheduleNights}
                  />
                  <OverviewCard
                    icon={<IoEarth />}
                    text="Countries"
                    subText={overviewCard?.numberOfCountries}
                    details={overviewCard?.numberOfCities}
                  />
                  <OverviewCard
                    icon={<IoPeople />}
                    text="Type"
                    subText="Small group tour"
                    details={`${overviewCard?.numberOfPersons || 0} Persons`}
                  />
                  <OverviewCard
                    icon={<IoCalendarOutline />}
                    text="Run"
                    subText={overviewCard?.tourRunFrom}
                    details={overviewCard?.tourRunTo}
                  />
                </div>
                <p>{overviewCard?.overviewDescription}</p>
              </>
            ) : (
              <p>No overview available</p>
            )}
          </div>
        </div>

        <div
          id="bookForm"
          className={style.rightSection}
        >
          <BookingForm
            title={tour?.title}
            tourId={tour?.id}
          />
        </div>
      </div>

      <div className={style.includeExclude}>
        <div className={style.include}>
          <h3>Included</h3>
          <ul>
            {includeExclude?.included && includeExclude.included.length > 0 ? (
              includeExclude.included.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li>No included services available.</li>
            )}
          </ul>
        </div>
        <div className={style.exclude}>
          <h3>Exclude</h3>
          <ul>
            {includeExclude?.excluded && includeExclude?.excluded.length > 0 ? (
              includeExclude?.excluded?.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li>No excluded services available.</li>
            )}
          </ul>
        </div>
      </div>

      <div className={style.nbSection}>
        <h3>N.B.:</h3>
        <ul>
          {includeExclude?.NB && includeExclude.NB.length > 0 ? (
            includeExclude?.NB.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <li>No notes available.</li>
          )}
        </ul>
      </div>

      <div className={style.page}>
        {tourDays && tourDays.length > 0 ? (
          <ItineraryCard itinerary={tourDays} />
        ) : (
          <div>No itinerary available</div>
        )}
      </div>

      {cardData ? (
        <div className={style.cruise}>
          <h2>Cruise</h2>
          <p>{cardData?.description}</p>
          <h4>Number of Rooms</h4>
          <ul>
            {cardData?.NumOfRooms && cardData.NumOfRooms.length > 0 ? (
              cardData.NumOfRooms.map((room, index) => (
                <li key={index}>{room}</li>
              ))
            ) : (
              <li>No rooms available.</li>
            )}
          </ul>
        </div>
      ) : (
        <div className={style.cruise}>
          <h2>Cruise</h2>
          <p>No cruise details available</p>
        </div>
      )}

      {cabinData?.newCabin ? (
        <div className={style.cabin}>
          <h2>Cabin</h2>
          <ul>
            {cabinData?.newCabin && cabinData.newCabin.length > 0 ? (
              cabinData.newCabin.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li>No cabin features available.</li>
            )}
          </ul>
        </div>
      ) : (
        <div className={style.cabin}>
          <h2>Cabin</h2>
          <p>No cabin details available</p>
        </div>
      )}

      <div className={style.prices}>
        <h2>Prices</h2>
        <div className={style.PricesCardsContainer}>
          {pricing && pricing.length > 0 ? (
            pricing.map((priceCard) => (
              <PricesCard key={priceCard.id} priceCard={priceCard} />
            ))
          ) : (
            <div>No pricing information available.</div>
          )}
        </div>
      </div>

      <div className={style.reviews}>
        {/* Future reviews section */}
      </div>

      {openImageSlider && (
        <Modal isOpen={openImageSlider} onClose={() => setOpenImageSlider(false)}>
          <ImagesSlider images={gallery?.image} />
        </Modal>
      )}
    </div>
  );
};

const OverviewCard = ({ icon, text, subText, details }) => (
  <div className={style.cardContainer}>
    <div className={style.icon}>{icon}</div>
    <p>{text}</p>
    <h3>{subText}</h3>
    <p>{details}</p>
  </div>
);

export default TourDetailsClient;