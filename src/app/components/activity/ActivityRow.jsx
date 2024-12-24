'use client'
import ActivityCard from './ActivityCard'
import Image from 'next/image'

const ActivityRow = ({activities}) => {
    const extractFirstNumber = (str) => {
        const match = str?.match(/\d+/);
        return match ? match[0] : null;
    };

    const activityData = [
        { icon: '/images/icon6.png', title: 'Adventure', index: 0 },
        { icon: '/images/icon10.png', title: 'Trekking', index: 2 },
        { icon: '/images/icon9.png', title: 'Camp Fire', index: 4 },
        { icon: '/images/icon8.png', title: 'Off Road', index: 6 },
        { icon: '/images/icon7.png', title: 'Camping', index: 8 },
        { icon: '/images/icon11.png', title: 'Exploring', index: 10 }
    ];

    return (
        <div className="activity-inner row">
            {activityData.map((activity) => (
                <ActivityCard 
                    key={activity.title}
                    imgSrc={activity.icon}
                    title={activities?.[activity.index] || activity.title}
                    destinationNum={extractFirstNumber(activities?.[activity.index + 1]) || 15}
                />
            ))}
        </div>
    )
}

export default ActivityRow
