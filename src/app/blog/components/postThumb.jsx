import Link from 'next/link';
import Image from 'next/image';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return formattedDate;
};

const PostThumb = ({ slug, imgSrc, title, date, comments }) => {
  return (
    <li>
      <figure className="post-thumb">
        <Link href={`/blog/${slug}`}>
          <Image
            src={imgSrc || '/default-placeholder.png'}
            alt={title || 'Blog post image'}
            width={100}
            height={100}
          />
        </Link>
      </figure>
      <div className="post-content">
        <h5>
          <Link href={`/blog/${slug}`}>{title}</Link>
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