import Image from "next/image";
import Link from "next/link";

const DistiItem = ({ imgSrc, country, content, id }) => {
  return (
    <Link href={`/tours/destination/${id}`} passHref>
      <div className="desti-item overlay-desti-item">
        <figure className="desti-image">
          <Image src={imgSrc} alt={country} width={200} height={"200"} />
        </figure>
        <div className="meta-cat bg-meta-cat">
          <p>{country}</p>
        </div>
      </div>
    </Link>
  );
};

export default DistiItem;
