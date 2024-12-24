import Link from "next/link";
import { FaTripadvisor } from "react-icons/fa";
import { SiTrustpilot } from "react-icons/si";

const SocialMadia = () => {
  return (
    <div className="footer-social header-social social-links my-auto">
      <ul>
        <li>
          <Link href="https://www.facebook.com/albumtravelegypt?mibextid=ZbWKwL">
            <i className="fab fa-facebook-f" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <Link href="https://www.pinterest.com/Albumtravel/">
            <i className="fab fa-pinterest" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <Link href="https://www.tiktok.com/@albumtravel11?_t=8nY0e4IvM7k&_r=1">
            <svg
              className="fab fa-tiktok"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
            </svg>
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/albumtravelegypt?igsh=MWtmamk2aGRpMTVqYg==">
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <Link href="https://www.tripadvisor.com/Profile/albumtravel">
            <FaTripadvisor />
          </Link>
        </li>
        <li>
          <Link href="https://www.trustpilot.com/review/albumtravel.com">
            <SiTrustpilot />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SocialMadia;
