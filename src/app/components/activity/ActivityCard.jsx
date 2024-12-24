'use client'
import Image from 'next/image'
import Link from 'next/link'

const ActivityCard = ({ imgSrc, title, destinationNum }) => {
  return (
    <div className="col-lg-2 col-md-4 col-sm-6">
      <div className="activity-item">
        <div className="activity-icon">
          <Link href="#">
            <div style={{ position: 'relative', width: '60px', height: '60px' }}>
              <Image
                src={imgSrc}
                alt={title}
                fill
                sizes="60px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
        </div>
        <div className="activity-content">
          <h4>
            <Link href="#">{title}</Link>
          </h4>
          <p>{`${destinationNum} Destination`}</p>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard
