"use client";
import Image from "next/image";
import { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const CounterItem = ({ icon, count, text, unit }) => {
  const [startCount, setStartCount] = useState(false);
  const { ref } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        setStartCount(true);
      }
    },
  });

  return (
    <div className="counter-item" ref={ref}>
      <div className="counter-item-inner">
        <div className="counter-icon">
          <Image src={icon} alt={text} width={200} height={200} />
        </div>
        <div className="counter-content">
          <span className="counter-no">
            {startCount ? <CountUp end={count} duration={2} /> : 0}
            {unit}
          </span>
          <span className="counter-text">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default CounterItem;
