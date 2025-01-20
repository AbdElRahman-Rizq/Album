"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/shared/Modal";
import Image from "next/image";

const ArchiveCard = ({
  slug,
  id,
  imgSrc,
  title,
  date,
  comments,
  children,
  language,
}) => {
  const router = useRouter();
  const [openBox, setOpenBox] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  // Ensure consistent date formatting on the client side
  useEffect(() => {
    if (date) {
      const parsedDate = new Date(date);
      setFormattedDate(
        parsedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [date]);

  const handleClick = (e) => {
    if (!language) {
      e.preventDefault();
      setOpenBox(true);
    } else {
      router.push(`/blog/${slug}?language=${language}`);
    }
  };

  return (
    <>
      <article className="post">
        <figure className="feature-image">
          <a>
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={title || "Blog image"}
                width={200}
                height={200}
                unoptimized // Ensure no SSR optimization mismatch
              />
            ) : (
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>No Image Available</span>
              </div>
            )}
          </a>
        </figure>
        <div className="entry-content">
          <h3>
            <a onClick={handleClick} style={{ cursor: "pointer" }}>
              {title}
            </a>
          </h3>
          <div className="entry-meta">
            <span className="posted-on">
              <a>{formattedDate || "Loading..."}</a>
            </span>
            <span className="comments-link">
              <a>{comments}</a>
            </span>
          </div>
        </div>
      </article>
      <Modal isAppear={openBox} onClose={() => setOpenBox(false)}>
        <h2 style={{ textAlign: "center" }}>Choose Language First</h2>
      </Modal>
    </>
  );
};

export default ArchiveCard;
