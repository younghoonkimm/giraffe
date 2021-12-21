import React from "react";
import { RestaurantType } from "./type";

const Restaurant: React.FC<RestaurantType> = ({ id, coverImg, name, categoryName }) => {
  return (
    <>
      <div style={{ backgroundImage: `url(${coverImg})` }} className="bg-red-500 bg-cover bg-center py-28"></div>
      <h3 className="text-xl mt-3 font-medium mb-2">{name}</h3>
      <span className="block border-t mt-4 py-2 text-xs opacity-50 border-gray-200">{categoryName}</span>
    </>
  );
};

export default Restaurant;
