import React from "react";
import { Link } from "react-router-dom";
import SharePopup from "./SharePopup";
// import { Image8 } from "../assets";
import { formatDistance } from "date-fns";

const NewsCard = ({
  title,
  desc,
  image,
  category,
  date,
  slug,
  link,
  share,
}) => {
  return (
    <>
      <div className="bg-white grid grid-flow-col justify-start rounded-[20px] lg:max-h-[135px]">
        <Link to={`/${link}/${slug}`}>
          <img
            src={image}
            alt="Banner Here"
            className="w-[135px] h-[135px] max-w-[135px] lg:min-w-[146px] lg:max-w-[146px] max-h-[135px] block object-cover rounded-[20px] lg:rounded-[15px]"
          />
        </Link>
        <div className="m-[10px] ml-[14px] mb-0 relative">
          <Link to={`/${link}/${slug}`}>
            <p className="xs:text-sm font-medium text-[17px] lg:text-[13px] lg:leading-[16px] leading-5 newsCard-Title">
              {title}
            </p>
            <p
              className={`text-[12px] leading-[15px] font-light mt-1 newsCard-Desc ${
                desc === null ? "hidden" : "block"
              } `}
            >
              {desc === null ? "" : desc}
            </p>
          </Link>

          <div className="absolute bottom-[12px] font-light text-[12px] flex justify-between items-center">
            <div className="flex gap-3 items-center justify-start">
              <p className="text-xs font-light leading-[12px] lg:text-[10px] lg:leading-[10px]">
                {formatDistance(new Date(), new Date(date), new Date(), {
                  addSuffix: true,
                })}
              </p>
              <p className="text-xs font-light leading-[12px] lg:text-[10px] lg:leading-[10px] flex items-center gap-[5px]">
                <span className="text-[6px] text-[#979797]">&#9679; </span>
                {category === undefined ? "500 Views" : category}
              </p>
            </div>
          </div>

          {share !== false ? (
            <SharePopup
              className="absolute bottom-[12px] right-[10px]"
              url={`/${link}/${slug}`}
              title={title}
              desc={desc}
              text={
                <div className="flex  items-center text-[#979797] gap-[2px]">
                  <span className="text-[6px]">&#9679;</span>
                  <span className="text-[6px]">&#9679;</span>
                  <span className="text-[6px]">&#9679;</span>
                </div>
              }
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default NewsCard;
