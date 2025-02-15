"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DestinationCard from "./DestinationCard";
import CustomButton from "../CustomButton";
import { api_url } from "@/constants/base_url";
import { getTokenFromCookies } from "../../../utils/cookieUtils";

const DestinationRow = ({ btnText }) => {
  const { data } = useQuery({
    queryKey: ["destinations"],
    queryFn: () =>
      axios.get(`${api_url}destinations`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
        },
      }),
  });

  return (
    <div className="destination-inner destination-three-column">
      <div className="row">
        {data?.data?.data?.map((destination) => (
          <DestinationCard
            key={destination.id}
            id={destination?.id}
            title={destination?.name}
            imgSrc={`${api_url}${destination.image}`.replace(
              "/api/",
              "/storage/"
            )}
            slug={destination?.slug}
          />
        ))}
      </div>
      <CustomButton href="/destination">
        {btnText || "MORE DESTINATION"}
      </CustomButton>
    </div>
  );
};

export default DestinationRow;
