'use client'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaClock,
  FaUserFriends,
  FaMapMarkerAlt,
  FaArrowRight,
  FaStar
} from 'react-icons/fa'
import "./packageCard.css";
import CustomButton from '../shared/customButton/CustomButton.jsx';
const PackageCard = ({
  buttonColor,
  children,
  recommended,
  people,
  description,
  title,
  image,
  duration,
  reviews,
  rating,
  location,
  HasOffer,
  id,
  api_url
}) => {
  const handleSeeMore = (description) => {
    // You need to implement the logic for handleSeeMore function
    console.log(description)
  }

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="package-wrap">
        <figure className="feature-image">
          <Link href={`/tours/${id}`}>
            <Image
              src={`${api_url}${image}`.replace("/api/", "/")}
              alt={title}
              width={300}
              height={300}
              style={{ objectFit: "cover" }}
            />
          </Link>
        </figure>
        {HasOffer && (
          <div className="featured text-white p-2">Discount %</div>
        )}
        <div className="package-content-wrap">
          <div className="package-meta text-center">
            <ul>
              <li>
                <FaClock style={{ marginRight: '5px' }} />
                {duration}
              </li>
              <li>
                <FaUserFriends style={{ marginRight: '5px' }} />
                People: {people}
              </li>
              <li>
                <FaMapMarkerAlt style={{ marginRight: '5px' }} />
                {location}
              </li>
            </ul>
          </div>
          <div className="package-content">
            <h3>
              <Link href={`/tours/${id}`}>{title}</Link>
            </h3>
            <div className="review-area">
              <span className="review-text">
                <FaStar style={{ marginRight: '5px' }} />
                {reviews}
              </span>
              <div className="rating-start" title="Rated 5 out of 5">
                <span style={{ width: (reviews * 20) + "%" }}></span>
              </div>
            </div>
            <p className="description">
              {description.length > 20 ? description.slice(0, 20) + '...' : description}
              {description.length > 20 && <CustomButton href={`/tours/${id}`} onClick={() => handleSeeMore(description)}>See More</CustomButton>}
            </p>
            <div className="btn-wrap">
              <Link
                href="/tours"
                className={`button-text ${buttonColor === "red" ? "text-white book" : ""} width-6`}
              >
                Book Now <FaArrowRight style={{ marginLeft: '5px' }} />
              </Link>
              <h6 className="package-price">{children}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;
