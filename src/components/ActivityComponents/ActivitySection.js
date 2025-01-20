'use client';

import ActivitySectionHeading from "./SectionHeading";
import ActivityItem from "./ActivityItem";
import img1 from "@/assets/images/icon6.png";
import img2 from "@/assets/images/icon10.png";
import img3 from "@/assets/images/icon9.png";
import img4 from "@/assets/images/icon8.png";
import img5 from "@/assets/images/icon7.png";
import img6 from "@/assets/images/icon11.png";

const activities = [
  {
    id: 1,
    icon: img1,
    title: "Adventure",
    destinations: "15 Destination",
  },
  {
    id: 2,
    icon: img2,
    title: "Trekking",
    destinations: "12 Destination",
  },
  {
    id: 3,
    icon: img3,
    title: "Camp Fire",
    destinations: "7 Destination",
  },
  {
    id: 4,
    icon: img4,
    title: "Off Road",
    destinations: "15 Destination",
  },
  {
    id: 5,
    icon: img5,
    title: "Camping",
    destinations: "13 Destination",
  },
  {
    id: 6,
    icon: img6,
    title: "Exploring",
    destinations: "25 Destination",
  },
];

const ActivitySection = () => {
  return (
    <section className="activity-section">
      <div className="container">
        <ActivitySectionHeading />
        <div className="activity-inner row">
          {activities.map((activity) => (
            <div className="col-lg-2 col-md-4 col-sm-6" key={activity.id}>
              <ActivityItem {...activity} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;
