"use client";

import img16 from "@/assets/images/img16.jpg";
import { api_url } from "@/constants/base_url";
import { useHomeBlog } from "@/providers/HomeBlogContext";

const SubscribeSection = () => {
  const { blog, isBlogLoading } = useHomeBlog();
  return (
    <section
      className="subscribe-section"
      style={{
        backgroundImage: blog?.sub_card_8?.image?.[0]
          ? `url(${api_url}${blog?.sub_card_8?.image[0]})`.replace(
            "/api/",
            "/storage/"
          )
          : `url(${img16})`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="section-heading section-heading-white">
              <h5 className="dash-style">
                {blog?.sub_card_8?.title || "HOLIDAY PACKAGE OFFER"}
              </h5>
              <h2>
                {blog?.sub_card_8?.content?.split("-.-")?.[0] ||
                  "HOLIDAY SPECIAL 25% OFF !"}
              </h2>
              <h4>
                {blog?.sub_card_8?.content?.split("-.-")?.[1] ||
                  "Sign up now to recieve hot special offers and information about the best tour packages, updates and discounts !!"}
              </h4>
              <div className="newsletter-form">
                <form>
                  <input
                    type="email"
                    name="s"
                    placeholder="Your Email Address"
                  />
                  <input
                    type="submit"
                    name="signup"
                    value={
                      blog?.sub_card_8?.content?.split("-.-")?.[2] ||
                      "SIGN UP NOW!"
                    }
                  />
                </form>
              </div>
              <p>
                {blog?.sub_card_8?.content?.split("-.-")?.[3] ||
                  "Enjoy a festive 25% discount with our Holiday Special! Sign up today for exclusive offers on top tour packages and stay updated with the latest discounts and updates."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
