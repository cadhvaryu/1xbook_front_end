import React from "react";
import { useStateContext } from "../context/ContextProvider";

const SearchLoader = () => {
  const { blogData } = useStateContext();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px]">
        {blogData.map((item, index) => {
          return (
            <div className="blur-[3px] bg-white grid grid-flow-col justify-start rounded-[20px] lg:max-h-[135px]">
              <img
                src={item.image}
                alt=""
                className="w-[135px] h-[135px] max-w-[135px] lg:min-w-[146px] lg:max-w-[146px] max-h-[135px] block object-cover rounded-[20px] lg:rounded-[15px]"
              />
              <div className="m-[10px] ml-[14px] mb-0 relative">
                <p className="font-medium text-[17px] lg:text-[13px] lg:leading-[16px] leading-5 lg:hidden"></p>
                <p className="font-medium lg:text-[18px] lg:leading-[21px] hidden lg:block"></p>
                <p></p>

                <div className="absolute bottom-[12px] font-light text-[12px] flex justify-between items-center">
                  <div className="flex gap-3 items-center justify-start">
                    <p className="text-xs font-light leading-[12px] lg:text-[10px] lg:leading-[10px]"></p>
                    <p className="text-xs font-light leading-[12px] lg:text-[10px] lg:leading-[10px] flex items-center gap-[5px]">
                      <span className="text-[6px] text-[#979797]">
                        &#9679;{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchLoader;
