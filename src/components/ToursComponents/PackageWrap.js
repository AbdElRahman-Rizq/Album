"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { api_url } from "@/constants/base_url";
import {
  FaClock,
  FaUserFriends,
  FaMapMarkerAlt,
  FaArrowRight,
  FaHeart,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

const PackageWrap = ({
  image,
  price,
  availability_days,
  number_of_people,
  location,
  title,
  number_of_reviews,
  rating,
  description,
  slug,
  HasOffer,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getShortDescription = (text) => {
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  // Calculate star rating
  const renderStars = (rating) => {
    const totalStars = 5;
    return [...Array(totalStars)].map((_, index) =>
      index < Math.floor(rating) ? (
        <FaStar key={index} style={{ color: "gold", fontSize: "16px" }} />
      ) : (
        <FaRegStar key={index} style={{ color: "#ccd6df", fontSize: "16px" }} />
      )
    );
  };

  return (
    <div className="package-wrap">
      <figure className="feature-image">
        <Link href={`/tours/${slug}`}>
          <Image
            src={`${api_url}${image}`.replace("/api/", "/")}
            alt={title}
            width={350}
            height={350}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            priority={false}
            style={{ objectFit: "cover" }}
          />
        </Link>
      </figure>
      {HasOffer ? (
        <div
          className="package-price"
          style={{
            color: "#f1f1f1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ color: "white" }}>Discount</p>
        </div>
      ) : null}
      <div className="package-content-wrap">
        <div className="package-meta text-center">
          <ul>
            <li>
              <FaClock style={{ marginRight: "5px" }} />
              {availability_days}
            </li>
            <li>
              <FaUserFriends style={{ marginRight: "5px" }} />
              People: {number_of_people}
            </li>
            <li>
              <FaMapMarkerAlt style={{ marginRight: "5px" }} />
              {location}
            </li>
          </ul>
        </div>
        <div className="package-content">
          <h3>
            <Link href={`/tours/${slug}`}>{title}</Link>
          </h3>
          <div className="review-area">
            <span className="review-text">({number_of_reviews})</span>
            <div className="rating-start" title={`Rated ${rating} out of 5`}>
              {renderStars(rating)}
            </div>
          </div>
          <div className="description-container">
            <p
              className={`description ${showFullDescription ? "expanded" : ""}`}
            >
              {showFullDescription
                ? description
                : getShortDescription(description)}
            </p>
            {description.length > 100 && (
              <button onClick={toggleDescription} className="see-more-btn">
                {showFullDescription ? "See Less" : "See More"}
              </button>
            )}
          </div>
          <div className="btn-wrap">
            <Link href={`/tours/${slug}`} className="button-text width-6">
              Book Now <FaArrowRight style={{ marginLeft: "5px" }} />
            </Link>
            <Link href={`/tours/${slug}`} className="button-text width-6">
              Wish List <FaHeart style={{ marginLeft: "5px" }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageWrap;
