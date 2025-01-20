import Link from "next/link";
import PropTypes from 'prop-types';
import {
  FaFacebookF,
  FaPinterestP,
  FaTiktok,
  FaInstagram,
  FaTripadvisor
} from "react-icons/fa";
import { SiTrustpilot } from "react-icons/si";

const socialMediaLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/albumtravelegypt?mibextid=ZbWKwL',
    icon: FaFacebookF
  },
  {
    name: 'Pinterest',
    url: 'https://www.pinterest.com/Albumtravel/',
    icon: FaPinterestP
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@albumtravel11?_t=8nY0e4IvM7k&_r=1',
    icon: FaTiktok
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/albumtravelegypt?igsh=MWtmamk2aGRpMTVqYg==',
    icon: FaInstagram
  },
  {
    name: 'TripAdvisor',
    url: 'https://www.tripadvisor.com/Profile/albumtravel',
    icon: FaTripadvisor
  },
  {
    name: 'TrustPilot',
    url: 'https://www.trustpilot.com/review/albumtravel.com',
    icon: SiTrustpilot
  }
];

const SocialMedia = ({ className = '', color = 'black' }) => {
  const iconStyle = { color };

  return (
    <div className={`footer-social header-social social-links my-auto ${className}`}>
      <ul style={{ marginTop: '5%' }}>
        {socialMediaLinks.map(({ name, url, icon: Icon }) => (
          <li key={name}>
            <Link href={url} aria-label={`${name} profile`}>
              <Icon style={iconStyle} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

SocialMedia.propTypes = {
  className: PropTypes.string
};

export default SocialMedia;
