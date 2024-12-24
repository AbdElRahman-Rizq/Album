'use client'
import { useState, useRef } from "react";
import Image from 'next/image'
import Link from 'next/link'
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useHomeBlog } from "@/home/HomeBlogProvider";
import { BsFillPlayFill } from 'react-icons/bs';

import img8 from "@/assets/images/img8.jpg";
import icon1 from "@/assets/images/icon1.png";
import icon2 from "@/assets/images/icon2.png";
import icon3 from "@/assets/images/icon3.png";
import icon4 from "@/assets/images/icon4.png";
import icon5 from "@/assets/images/icon5.png";
import { api_url } from "@/constants/base_url";

const CounterItem = ({ iconSrc, counter, text }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="counter-item" ref={ref}>
      <div className="counter-icon">
        <Image
          src={iconSrc}
          alt={text}
          width={300}
          height={200}
          quality={90}
          priority={false}
        />
      </div>
      <div className="counter-content">
        <span className="counter-no">
          <span className="counter">
            {inView ? <CountUp end={counter} duration={2} /> : 0}
          </span>
          K+
        </span>
        <span className="counter-text">{text}</span>
      </div>
    </div>
  );
};

const SupportArea = ({ iconSrc, phone, description, call }) => (
  <div className="support-area">
    <div className="support-icon">
      <Image
        src={iconSrc}
        alt={description || "Support"}
        width={100}
        height={100}
        quality={90}
      />
    </div>
    <div className="support-content">
      <h4>{description || "Our 24/7 Emergency Phone Services"}</h4>
      <h3>
        <Link href={`tel:${phone || "+201033973047"}`}>
          {call || "Call"}: {phone}
        </Link>
      </h3>
    </div>
  </div>
);

const CallbackInner = ({ title, content, icons }) => {
  const allContent = content?.split("-.-");
  const extractFirstNumber = (str) => {
    const match = str?.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  return (
    <div className="callback-inner">
      <div className="section-heading section-heading-white">
        <h5 className="dash-style">{title || "CALLBACK FOR MORE"}</h5>
        <h2>{allContent?.[0] || "GO TRAVEL. DISCOVER. REMEMBER US!!"}</h2>
        <p>
          {allContent?.[1] ||
            "We are committed to curate and flawlessly execute travel experiences that allow travelers to explore the world with ease and create memories that last a lifetime"}
        </p>
      </div>
      <div className="callback-counter-wrap">
        <CounterItem
          iconSrc={icon1}
          counter={extractFirstNumber(allContent?.[2]) || 500}
          text={allContent?.[3] || "Satisfied Clients"}
        />
        <CounterItem
          iconSrc={icon2}
          counter={extractFirstNumber(allContent?.[4]) || 250}
          text={allContent?.[5] || "Satisfied Clients"}
        />
        <CounterItem
          iconSrc={icon3}
          counter={extractFirstNumber(allContent?.[6]) || 15}
          text={allContent?.[7] || "Satisfied Clients"}
        />
        <CounterItem
          iconSrc={icon4}
          counter={extractFirstNumber(allContent?.[8]) || 10}
          text={allContent?.[9] || "Satisfied Clients"}
        />
      </div>
      <SupportArea
        description={allContent?.[10]}
        call={allContent?.[11]}
        iconSrc={icon5}
        phone={allContent?.[12] || "+201033973047"}
      />
    </div>
  );
};

const Modal = ({ show, handleClose, videoSrc }) => {
  const videoRef = useRef(null);

  if (!show) return null;

  return (
    <div className="modal-video display-block z-50">
      <section className="modal-main">
        <button
          onClick={handleClose}
          className="close-button p-3"
          aria-label="Close modal"
        >
          X
        </button>
        <div style={{ width: '100%', height: '100%', maxHeight: '80vh', position: 'relative' }}>
          <video
            ref={videoRef}
            controls
            autoPlay
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};

const CallbackImg = ({ backgroundImage }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = (id) => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <div
        className="callback-img"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="video-button">
          <a
            id="video-container"
            data-video-id="IUN664s7N-c"
            onClick={() => handleShow("IUN664s7N-c")}
          >
            {/* <i className="fas fa-play"></i> */}
            <BsFillPlayFill size={5} className="  icon-play" style={{ fontSize: '5px' }} />
          </a>
        </div>
        <Modal show={showModal} handleClose={handleClose} videoSrc={"./images/Sequence.mp4"} />
      </div>
    </>
  );
};

const CallbackSection = ({ icons, defaultImg }) => {
  const { blog } = useHomeBlog();

  const backgroundImage = blog?.sub_card_4?.image?.[0]
    ? `${api_url}${blog?.sub_card_4?.image[0]}`.slice(0, -4)
    : defaultImg?.src || img8.src;

  return (
    <section className="callback-section">
      <div className="container-fluid">
        <div className="row no-gutters align-items-center">
          <div className="col-lg-5">
            <CallbackImg backgroundImage={backgroundImage} />
          </div>
          <div className="col-lg-7">
            <CallbackInner
              title={blog?.sub_card_4?.title}
              content={blog?.sub_card_4?.content}
              icons={icons}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallbackSection;
