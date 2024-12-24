'use client'
import SectionHeading from './SectionHeading'
import ActivityRow from './activity/ActivityRow'
import { useHomeBlog } from "@/home/HomeBlogProvider";

const AdventureAndActivity = () => {
    const {blog} = useHomeBlog();
    
    return (
        <>
            <SectionHeading 
                title={blog?.sub_card_5?.title || "TRAVEL BY ACTIVITY"} 
                headingTextAlignment="text-center" 
                containerTextsStyle="col-lg-8 offset-lg-2"
            >
                <h2>{blog?.sub_card_5?.content?.split("-.-")?.[0] || "ADVENTURE & ACTIVITY"}</h2>
                <p>
                    {blog?.sub_card_5?.content?.split("-.-")?.[1] || 
                    "Step into a world of excitement and discovery as you embark on thrilling journeys and engage in immersive activities. From awe-inspiring natural wonders to captivating cultural encounters, our upcoming travel offers will satisfy your thirst for adventure and create unforgettable moments."}
                </p>
            </SectionHeading>

            <ActivityRow activities={blog?.sub_card_5?.content?.split("-.-")?.slice(2)}/>
        </>
    )
}

export default AdventureAndActivity
