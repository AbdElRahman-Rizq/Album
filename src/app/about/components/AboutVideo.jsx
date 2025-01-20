"use client";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

const AboutVideo = ({ backgroundImage, videoId, videoUrl }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = (id) => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div
        className="about-video-wrap"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="video-button">
          <a id="video-container" onClick={handleShow}>
            <FaPlay className="icon" />
          </a>
        </div>
        <Modal show={showModal} handleClose={handleClose} videoUrl={videoUrl} />
      </div>
    </div>
  );
};

export default AboutVideo;

const Modal = ({ show, handleClose, videoUrl }) => {
  const showHideClassName = show ? " display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button onClick={handleClose} className="close-button p-3">
          X
        </button>
        <video width="100%" height="100%" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </div>
  );
};
