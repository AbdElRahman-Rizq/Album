'use client'
import { useQuery } from '@tanstack/react-query'
import SectionHeading from './SectionHeading'
import SpecialRow from './special/SpecialRow'
import axios from 'axios'
import { useHomeBlog } from "@/home/HomeBlogProvider";
import { api_url } from '@/constants/base_url'

const SpecialTravelOffer = () => {
    const { blog } = useHomeBlog();
    const { data } = useQuery({
        queryKey: ["specialOffers"],
        queryFn: () => axios.get(`${api_url}tour?HasOffer=1`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    })

    return (
        <>
            <SectionHeading
                title={blog?.sub_card_6?.title || "TRAVEL OFFER & DISCOUNT"}
                headingTextAlignment="text-center"
                containerTextsStyle="col-lg-8 offset-lg-2"
            >
                <h2>{blog?.sub_card_6?.content?.split("-.-")?.[0] || "SPECIAL TRAVEL OFFER"}</h2>
                <p>
                    {blog?.sub_card_6?.content?.split("-.-")?.[1] ||
                        "Elevate your travel experience with our curated collection of special travel offers. From luxury escapes to hidden gems, our upcoming selection is designed to provide you with unparalleled access to unique destinations and unforgettable adventures, creating memories that will last a lifetime."}
                </p>
            </SectionHeading>

            <SpecialRow data={data?.data?.data?.data} />
        </>
    )
}

export default SpecialTravelOffer
