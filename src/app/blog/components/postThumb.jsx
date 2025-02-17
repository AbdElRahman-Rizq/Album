import Link from 'next/link';
import Image from 'next/image';
import { api_url } from '@/constants/base_url';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return formattedDate;
};

const PostThumb = ({ slug, imgSrc, title, date, comments, language }) => {
  console.log("image: ", imgSrc);

  return (
    <li>
      <figure className="post-thumb">
        <Link href={`/blog/${slug}?language=${language}`}>
          <Image
            src={`${api_url}${imgSrc}`.replace("/api/", "/storage/")}
            alt={title || 'Blog post image'}
            width={100}
            height={100}
          />
        </Link>
      </figure>
      <div className="post-content">
        <h5>
          <Link href={`/blog/${slug}?language=${language}`}>{title}</Link>
        </h5>
        <div className="entry-meta">
          <span className="posted-on">
            <Link href="#">{formatDate(date)}</Link>
          </span>
          <span className="comments-link">
            <Link href="#">{comments}</Link>
          </span>
        </div>
      </div>
    </li>
  )
}

export default PostThumb;