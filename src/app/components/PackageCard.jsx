'use client'
import Link from 'next/link'
import Image from 'next/image'

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
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="package-wrap">
        <figure className="feature-image">
          <Link href={`/tours/${id}`}>
            <Image
              src={`${api_url}${image}`.slice(0, -4)}
              alt={title}
              width={300}
              height={350}
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
                <i className="far fa-clock"></i>
                {duration}
              </li>
              <li>
                <i className="fas fa-user-friends"></i>
                People: {people}
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                {location}
              </li>
            </ul>
          </div>
          <div className="package-content">
            <h3>
              <Link href={`/tours/${id}`}>{title}</Link>
            </h3>
            <div className="review-area">
              <span className="review-text">({reviews})</span>
              <div className="rating-start" title="Rated 5 out of 5">
                <span style={{ width: reviews + "%" }}></span>
              </div>
            </div>
            <p>{description && description.slice(0, 50) + " ..."}</p>
            <div className="btn-wrap">
              <Link
                href="/tours"
                className={`button-text ${buttonColor === "red" ? "text-white book" : ""} width-6`}
              >
                Book Now<i className="fas fa-arrow-right"></i>
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
