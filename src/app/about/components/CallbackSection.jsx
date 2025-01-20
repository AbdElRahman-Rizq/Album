"use client";
import icon1 from "@/assets/images/icon1.png";
import icon2 from "@/assets/images/icon2.png";
import icon3 from "@/assets/images/icon3.png";
import icon4 from "@/assets/images/icon4.png";
import CounterItem from "./CounterItem";
import { useHomeBlog } from "@/providers/HomeBlogContext";


const counters = [
  { icon: icon1, count: "500", text: "Satisfied Clients", unit: "K+" },
  { icon: icon2, count: "250", text: "Awards Achieve", unit: "K+" },
  { icon: icon3, count: "15", text: "Active Members", unit: "K+" },
  { icon: icon4, count: "10", text: "Tour Destination", unit: "K+" },
];

const CallbackSection = () => {
  const { blog, isBlogLoading } = useHomeBlog();
  const allContent = blog?.sub_card_4?.content?.split("-.-");
  const extractFirstNumber = (str) => {
    const match = str?.match(/\d+/);
    return match ? match?.[0] : null;
  };
  return (
    <div
      className="fullwidth-callback"
      style={{ backgroundImage: "url(@/assets/images/img26.jpg)" }}
    >
      <div className="container">
        <div className="section-heading section-heading-white text-center">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h5 className="dash-style">
                {blog?.sub_card_4?.title || "CALLBACK FOR MORE"}
              </h5>
              <h2>{allContent?.[0] || "GO TRAVEL. DISCOVER. REMEMBER US!!"}</h2>
              <p>
                {allContent?.[1] ||
                  `We are committed to curate and flawlessly execute travel
              experiences that allow travelers to explore the world with ease
              and create memories that last a lifetime.`}
              </p>
            </div>
          </div>
        </div>
        <div className="callback-counter-wrap">
          {/* {counters.map((counter, index) => (
          <CounterItem key={index} {...counter} />
        ))} */}
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <CounterItem
                unit={"K+"}
                icon={counters?.[index].icon}
                count={extractFirstNumber(allContent?.[index * 2 + 2])}
                text={allContent?.[index * 2 + 3]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CallbackSection;
