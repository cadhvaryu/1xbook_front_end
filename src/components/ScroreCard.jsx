import React from "react";
import { LiveIcon, Team1, Team2 } from "../assets";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper";

const ScroreCard = ({ className }) => {
  return (
    <div
      className={`scoreCard flex overflow-x-scroll mt-[33px]  mb-[15px] gap-[10px] ${className}`}
    >
      <Swiper
        className=""
        spaceBetween={20}
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView={"auto"}
      >
        <SwiperSlide>
          <div className="bg-white rounded-[20px] min-w-[311px] max-w-[311px] p-[15px]">
            <div className="text-[16px] leading-[16px] font-light flex gap-[17px]">
              <img src={LiveIcon} alt="" className="w-[50px]" />
              <p>Match 6</p>
              <p>The Hundred</p>
            </div>
            <div className="flex justify-between mt-[15px] mb-[7px]">
              <img src={Team1} alt="" />
              <p className="text-[13px] leading-[16px] font-medium">
                (100) 160/6
              </p>
            </div>
            <div className="flex justify-between">
              <img src={Team2} alt="" />
              <p className="text-[13px] leading-[16px] font-light">
                Yet to bat
              </p>
            </div>
            <p className="text-[12px] leading-[16px] font-light mt-[11px]">
              LNS elected to bat
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white rounded-[20px] min-w-[311px] max-w-[311px] p-[15px]">
            <div className="text-[16px] leading-[16px] font-light flex gap-[17px]">
              <img src={LiveIcon} alt="" className="w-[50px]" />
              <p>Match 6</p>
              <p>The Hundred</p>
            </div>
            <div className="flex justify-between mt-[15px] mb-[7px]">
              <img src={Team1} alt="" />
              <p className="text-[13px] leading-[16px] font-medium">
                (100) 160/6
              </p>
            </div>
            <div className="flex justify-between">
              <img src={Team2} alt="" />
              <p className="text-[13px] leading-[16px] font-light">
                Yet to bat
              </p>
            </div>
            <p className="text-[12px] leading-[16px] font-light mt-[11px]">
              LNS elected to bat
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white rounded-[20px] min-w-[311px] max-w-[311px] p-[15px]">
            <div className="text-[16px] leading-[16px] font-light flex gap-[17px]">
              <img src={LiveIcon} alt="" className="w-[50px]" />
              <p>Match 6</p>
              <p>The Hundred</p>
            </div>
            <div className="flex justify-between mt-[15px] mb-[7px]">
              <img src={Team1} alt="" />
              <p className="text-[13px] leading-[16px] font-medium">
                (100) 160/6
              </p>
            </div>
            <div className="flex justify-between">
              <img src={Team2} alt="" />
              <p className="text-[13px] leading-[16px] font-light">
                Yet to bat
              </p>
            </div>
            <p className="text-[12px] leading-[16px] font-light mt-[11px]">
              LNS elected to bat
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white rounded-[20px] min-w-[311px] max-w-[311px] p-[15px]">
            <div className="text-[16px] leading-[16px] font-light flex gap-[17px]">
              <img src={LiveIcon} alt="" className="w-[50px]" />
              <p>Match 6</p>
              <p>The Hundred</p>
            </div>
            <div className="flex justify-between mt-[15px] mb-[7px]">
              <img src={Team1} alt="" />
              <p className="text-[13px] leading-[16px] font-medium">
                (100) 160/6
              </p>
            </div>
            <div className="flex justify-between">
              <img src={Team2} alt="" />
              <p className="text-[13px] leading-[16px] font-light">
                Yet to bat
              </p>
            </div>
            <p className="text-[12px] leading-[16px] font-light mt-[11px]">
              LNS elected to bat
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white rounded-[20px] min-w-[311px] max-w-[311px] p-[15px]">
            <div className="text-[16px] leading-[16px] font-light flex gap-[17px]">
              <img src={LiveIcon} alt="" className="w-[50px]" />
              <p>Match 6</p>
              <p>The Hundred</p>
            </div>
            <div className="flex justify-between mt-[15px] mb-[7px]">
              <img src={Team1} alt="" />
              <p className="text-[13px] leading-[16px] font-medium">
                (100) 160/6
              </p>
            </div>
            <div className="flex justify-between">
              <img src={Team2} alt="" />
              <p className="text-[13px] leading-[16px] font-light">
                Yet to bat
              </p>
            </div>
            <p className="text-[12px] leading-[16px] font-light mt-[11px]">
              LNS elected to bat
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white rounded-[20px] min-w-[311px] max-w-[311px] p-[15px]">
            <div className="text-[16px] leading-[16px] font-light flex gap-[17px]">
              <img src={LiveIcon} alt="" className="w-[50px]" />
              <p>Match 6</p>
              <p>The Hundred</p>
            </div>
            <div className="flex justify-between mt-[15px] mb-[7px]">
              <img src={Team1} alt="" />
              <p className="text-[13px] leading-[16px] font-medium">
                (100) 160/6
              </p>
            </div>
            <div className="flex justify-between">
              <img src={Team2} alt="" />
              <p className="text-[13px] leading-[16px] font-light">
                Yet to bat
              </p>
            </div>
            <p className="text-[12px] leading-[16px] font-light mt-[11px]">
              LNS elected to bat
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white rounded-[20px] min-w-[311px] max-w-[311px] p-[15px]">
            <div className="text-[16px] leading-[16px] font-light flex gap-[17px]">
              <img src={LiveIcon} alt="" className="w-[50px]" />
              <p>Match 6</p>
              <p>The Hundred</p>
            </div>
            <div className="flex justify-between mt-[15px] mb-[7px]">
              <img src={Team1} alt="" />
              <p className="text-[13px] leading-[16px] font-medium">
                (100) 160/6
              </p>
            </div>
            <div className="flex justify-between">
              <img src={Team2} alt="" />
              <p className="text-[13px] leading-[16px] font-light">
                Yet to bat
              </p>
            </div>
            <p className="text-[12px] leading-[16px] font-light mt-[11px]">
              LNS elected to bat
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ScroreCard;
