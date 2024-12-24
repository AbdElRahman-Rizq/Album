'use client'
import Link from 'next/link'
import Image from 'next/image'

const DestinationCard = ({ imgSrc, title, desc, id }) => {
  return (
    <div className="col-md-4">
      <div className="desti-item overlay-desti-item">
        <figure className="desti-image">
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
        <div className="meta-cat bg-meta-cat">
          <div className="desti-content">
            <h3>
              <Link href={`/tours/destination/${id}`}>{title}</Link>
            </h3>
            <p>{desc}</p>
          </div>
          <Link href={`/tours/destination/${id}`}>See rewards</Link>
        </div>
      </div>
    </div>
  )
}

export default DestinationCard