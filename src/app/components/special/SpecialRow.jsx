'use client'
import { api_url } from '@/constants/base_url'
import SpecialCard from './SpecialCard'

const SpecialRow = ({ data }) => {
  return (
    <div className="special-inner">
      <div className="row">
        {data?.map((item) => (
          <SpecialCard
            key={item.id}
            id={item.id}
            imgSrc={`${api_url.slice(0, -4)}${item.image?.slice(1)}`}
            discount={15}
            country={item.location}
            description={item.description}
            title={item.title}
            numOfPeople={item.number_of_people}
            days={item.duration_days}
          />
        ))}
      </div>
    </div>
  )
}

export default SpecialRow
