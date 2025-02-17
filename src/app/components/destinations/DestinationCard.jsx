"use client";
import Link from "next/link";
import Image from "next/image";
import "../../home/home.css";

const DestinationCard = ({ imgSrc, title, desc, id, slug }) => {
  return (
    <div className="col-md-4">
      <div className="desti-item overlay-desti-item">
        <figure className="desti-image">
          <div style={{ position: "relative", width: "100%", height: "200px" }}>
            <Image
              src={imgSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              priority
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.35)', // Semi-transparent black overlay
              zIndex: 1
            }}></div>
          </div>
        </figure>
        <div className="meta-cat bg-meta-cat">
          <div className="desti-content">
            <h3>
              <Link href={`/tours/destination/${slug}`} style={{ color: 'white' }}>{title}</Link>
            </h3>
            <p style={{ color: 'white' }}>{desc}</p>
          </div>
          <p>
            {" "}
            <Link 
              className="text-white" 
              href={`/tours/destination/${slug}`}
              style={{ 
                color: 'white', 
                textDecoration: 'underline', 
                
              }}
            >
              See rewards
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
