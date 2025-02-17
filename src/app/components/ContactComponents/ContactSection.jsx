import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import "../sectionHeading/sectionHeading.css";
import "./contact.css";
import "../shared/form.css";
const ContactSection = () => {
  return (
    <div className="contact-page-section">
      <div className="contact-form-inner">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="contact-from-wrap">
                <div className="section-heading">
                  <h5 className="dash-style">GET IN TOUCH</h5>
                  <h2>CONTACT US TO GET MORE INFO</h2>
                  <p>PARTNER'S AND CLIENTS.</p>
                </div>
                <ContactForm />
              </div>
            </div>
            <div className="col-md-6">
              <ContactDetails />
            </div>
          </div>
        </div>
      </div>
      <div className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.0013527921183!2d31.1000382743534!3d29.979391121652224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584ff354d684ad%3A0x9db02b992e38c9a2!2s25%20Street%201%2C%20Al%20Haram%2C%20Giza%20Governorate%203510523!5e0!3m2!1sen!2seg!4v1719840322217!5m2!1sen!2seg"
          height="400"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactSection; 