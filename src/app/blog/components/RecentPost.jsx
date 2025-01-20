import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { api_url } from '../../constants/base_url';
import axios from 'axios';
import PostThumb from './postThumb';


const RecentPost = () => {
  const [currentPage, _] = useState(1);
  const { data } = useQuery({
    queryKey: ['gestBlog', currentPage],
    queryFn: () =>
      axios.get(`${api_url}blog?page=${currentPage}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    onSuccess: (response) => {
      console.log("Data fetched successfully:", response.data);
    },
    onError: (err) => {
      console.error("Error fetching data:", err);
    }
  });
  return (
    <aside className="widget widget_latest_post widget-post-thumb">
      <h3 className="widget-title">Recent Post</h3>
      <ul>
        {data?.data?.data?.data?.slice(0, 3)?.map((blog) => (
          <PostThumb
            key={blog._id}
            id={blog._id}
            // imgSrc={blog.imgSrc}
            title={blog.title}
            date={blog.created_at}
            comments={"No Comments"}
          />
        ))}
      </ul>
    </aside>
  )
}

export default RecentPost;