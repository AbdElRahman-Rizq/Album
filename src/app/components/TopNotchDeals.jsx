'use client'
import { useHomeBlog } from "@/providers/HomeBlogContext";
import SectionHeading from "./SectionHeading";
import DestinationRow from './destinations/DestinationRow';


const TopNotchDeals = () => {
    const { blog } = useHomeBlog()

    return (
        <>
            <SectionHeading
                title={blog?.sub_card_3?.title || "POPULAR DESTINATION"}
                rowAlignment="align-items-end"
                containerTextsStyle="col-lg-7"
            >
                <h2>{blog?.sub_card_3?.content?.split("-.-")[0] || "TOP NOTCH Deals"}</h2>
            </SectionHeading>

            <DestinationRow btnText={blog?.sub_card_3?.content?.split("-.-")[1]} />
        </>
    )
}

export default TopNotchDeals
