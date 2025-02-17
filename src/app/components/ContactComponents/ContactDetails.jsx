import Link from "next/link";

import { FaMapSigns, FaEnvelopeOpenText, FaPhoneVolume, FaFacebookF, FaPinterest, FaTiktok, FaInstagram, FaTripadvisor,FaStar } from 'react-icons/fa';

const ContactDetails = () => {
    return (
        <div className="contact-detail-wrap">
            <h3>Need help ?? Feel free to contact us!</h3>
            <p>
                Connect and explore the beauty of the Middle East. Initially established
                to cater to the travelers in the Far East region, we have successfully
                expanded our travel packages to encompass the global market.
            </p>
            <p>
                Our exceptional attention to detail, unrivaled expertise, and unwavering
                commitment to customer satisfaction make us the preferred choice for
                those seeking extraordinary journeys.
            </p>
            <div className="details-list">
                <ul>
                    <li>
                        <span className="icon">
                            <FaMapSigns />
                        </span>
                        <div className="details-content">
                            <h4>Location Address</h4>
                            <span>
                                25B First Gate, Hadayek Al-Ahram, Second Floor, Flat 07, Giza,
                                Egypt
                            </span>
                        </div>
                    </li>
                    <li>
                        <span className="icon">
                            <FaEnvelopeOpenText />
                        </span>
                        <div className="details-content">
                            <h4>Email Address</h4>
                            <span>info@albumtravel.com</span>
                        </div>
                    </li>
                    <li>
                        <span className="icon">
                            <FaPhoneVolume />
                        </span>
                        <div className="details-content">
                            <h4>Phone Number</h4>
                            <span>
                                Telephone: +2 010 0842 7156 / Mobile: +2 010 3397 3047
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="contct-social social-links">
                <h3>Follow us on social media..</h3>
                <ul>
                    <li>
                        <Link href="https://www.facebook.com/albumtravelegypt?mibextid=ZbWKwL">
                            <FaFacebookF />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.pinterest.com/Albumtravel/">
                            <FaPinterest />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.tiktok.com/@albumtravel11?_t=8nY0e4IvM7k&_r=1">
                            <FaTiktok />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.instagram.com/albumtravelegypt?igsh=MWtmamk2aGRpMTVqYg==">
                            <FaInstagram />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.tripadvisor.com/Profile/albumtravel">
                            <FaTripadvisor />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.trustpilot.com/review/albumtravel.com">
                            <FaStar />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ContactDetails; 