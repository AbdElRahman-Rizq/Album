const ContactForm = () => {
  return (
    <form className="contact-from">
      <p>
        <input type="text" name="name" placeholder="Your Name*" />
      </p>
      <p>
        <input type="email" name="email" placeholder="Your Email*" />
      </p>
      <p>
        <textarea rows="8" placeholder="Your Message*"></textarea>
      </p>
      <p>
        <input type="submit" name="submit" value="SUBMIT MESSAGE" />
      </p>
    </form>
  );
};

export default ContactForm; 