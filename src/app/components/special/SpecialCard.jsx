'use client'
import { useState } from 'react'
import { FaCalendarAlt, FaStar, FaStarHalf } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

const SpecialCard = ({
  imgSrc,
  discount,
  country,
  description = '',
  id,
  title,
  numOfPeople,
  days,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const toggleDescription = (e) => {
    e.preventDefault()
    setShowFullDescription(!showFullDescription)
  }

  const getShortDescription = (text) => {
    return text?.length > 200 ? text.substring(0, 50) + "..." : text
  }

  return (
    <div className="col-md-6 col-lg-4">
      <div className="special-item position-relative">
        <figure className="special-img">
          <div style={{ position: 'relative', width: '100%', height: '200px' }}>
            <Image
              src={imgSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </figure>
        {discount && (
          <div className="badge-dis">
            <span>Discount</span>
          </div>
        )}
        <div className="special-content">
          <div className="meta-cat">
            <Link href={`/tours/${id}`}>{title}</Link>
          </div>
          <h3>
            <Link href={`/tours/${id}`}>
              {showFullDescription
                ? description
                : getShortDescription(description)}
              {description?.length > 100 && (
                <button 
                  onClick={toggleDescription} 
                  className="toggle-button"
                  style={{ 
                    background: 'none',
                    border: 'none',
                    color: '#007bff',
                    cursor: 'pointer',
                    marginLeft: '8px'
                  }}
                >
                  {showFullDescription ? "See Less" : "See More"}
                </button>
              )}
            </Link>
          </h3>
          <div
            className="package-info"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              fontSize: "1rem",
            }}
          >
            <FaCalendarAlt />
            <span>{days} Days</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#FFD700",
              }}
            >
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <span>{numOfPeople} People</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialCard
