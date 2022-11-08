import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { CopyLinks, LikePopup, Share } from "../assets";
// import { useStateContext } from "../context/ContextProvider";

import toast from "react-hot-toast";

const shareMe = (url, title, desc) => {
  // Check if navigator.share is supported by the browser
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: process.env.REACT_APP_SITE_ADDRESS + url,
      })
      .catch(() => {
        console.log("Sharing failed");
      });
  } else {
    console.log("Sorry! Your browser does not support Web Share API");
  }
};

const SharePopup = ({ text, url, className, title, desc }) => {
  // const { setShareBlogId, setShareBox } = useStateContext();

  const notify = () => toast.success("Copied Successfully !")

  return (
    <div className={`${className} sharePopup cursor-pointer`}>
      <Popover>
        <PopoverHandler>{text}</PopoverHandler>
        <PopoverContent
          className="p-0 w-[189px] z-50  cursor-pointer"
          style={{ zIndex: 999999999 }}
        >
          <div className="h-[43px] pl-[18px] flex flex-col justify-center items-start">
            <img src={LikePopup} alt="" />
          </div>
          <div
            className="border-y border-[#8A8A8A] h-[43px] pl-[18px] flex flex-col justify-center items-start"
            id="shareBox"
            onClick={() => shareMe(url, title, desc)}
          >
            <img src={Share} alt="" />
          </div>
          <div
            className="h-[43px] pl-[18px] flex flex-col justify-center items-start"
            onClick={() => (
              <>
                {notify()}
                {navigator.clipboard.writeText(
                  process.env.REACT_APP_SITE_ADDRESS + url
                )}
              </>
            )}
          >
            <img src={CopyLinks} alt="" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SharePopup;
