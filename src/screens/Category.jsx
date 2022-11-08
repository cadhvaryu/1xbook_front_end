import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Ads } from "../assets";
import { NewsCard, ScroreCard, SharePopup } from "../components";
// import { useStateContext } from "../context/ContextProvider";
// import { formatDistance, subDays } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";
import { formatDistance } from "date-fns";
import { HStack, Skeleton, VStack } from "native-base";
import { useStateContext } from "../context/ContextProvider";

const Category = () => {

  // eslint-disable-next-line
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      // eslint-disable-next-line
      return (
        // eslint-disable-next-line
        '<span class=" ' + className + ' "> <div class="bg"></div> ' + "</span>"
      );
    },
  };

  const { slug } = useParams();

  const [newBlog, setNewBlog] = useState([]);
  const { isLoaded, setIsLoaded } = useStateContext();

  useEffect(() => {
    setIsLoaded(false);
    const getData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}blog-data?series=${slug}`
        // requestOptions
      )
        .then((response) => response.json())
        .then((result) => setNewBlog(result))
        .catch((error) => console.log("error", error));
      setIsLoaded(true);
    };
    getData();
     // eslint-disable-next-line
  }, [slug]);

  return (
    <div className="min-h-screen">
      <div className="mx-[18px] lg:mx-[37px] 2xl:mx-[150px] ">
        <ScroreCard />
        <p className="capitalize text-[20px] leading-4 font-light my-[10px]">
          {isLoaded && newBlog[0].series.name} News
        </p>

        <div className="homeSlider newsSlide max-h-fit mt-[25px]">
          <Swiper
            pagination={pagination}
            loop="true"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            grabCursor={true}
          >
            {newBlog.slice(0, 5).map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-[20px] h-[400px] md:h-[250px] lg:h-[360px] xl:h-[400px] md:grid grid-cols-2 relative">
                    <Link to={`/${item.sports.slug}/${item.slug}`}>
                      <img
                        src={item.image}
                        alt=""
                        className="rounded-[20px] w-full h-[207px] md:h-[250px] lg:w-full lg:h-[360px] xl:h-[400px] xl:min-w-[589px] xl:max-w-full block object-cover"
                      />
                    </Link>

                    <Link to={`/${item.sports.slug}/${item.slug}`}>
                      <div className="relative h-full">
                        <div className="px-[16px] lg:px-[39px]">
                          <p className="font-medium leading-[30px] xl:leading-[40px] text-[25px] xl:text-[32px] mt-[10px] newsPage-Title">
                            {item.title}
                          </p>
                          <p className="font-light text-[12px] mt-[10px] leading-[20px] newsPage-Desc">
                            {item.desc}
                          </p>
                        </div>
                        <div className="hidden md:flex absolute left-[16px] lg:left-[39px] lg:bottom-[26px] bottom-[15px] gap-[10px]">
                          <p className="font-light text-[12px] leading-[12px] flex items-center gap-[5px]">
                            {item.date &&
                              formatDistance(
                                new Date(),
                                new Date(item.date),
                                new Date(),
                                { addSuffix: true }
                              )}
                          </p>
                          <p className="font-light text-[12px] leading-[12px] flex items-center gap-[5px]">
                            <span className="text-[6px] text-[#979797]">
                              &#9679;
                            </span>
                            {item.sports.name}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <div className="md:hidden absolute left-[16px] lg:left-[39px] lg:bottom-[26px] bottom-[35px] flex gap-[10px]">
                      <p className="font-light text-[12px] leading-[12px] flex items-center gap-[5px]">
                        {item.date &&
                          formatDistance(
                            new Date(),
                            new Date(item.date),
                            new Date(),
                            { addSuffix: true }
                          )}{" "}
                      </p>
                      <p className="font-light text-[12px] leading-[12px] flex items-center gap-[5px]">
                        <span className="text-[6px] text-[#979797]">
                          &#9679;
                        </span>
                        {item.sports.name}
                      </p>
                    </div>

                    <SharePopup
                      url={`/${item.sports.slug}/${item.slug}`}
                      title={item.title}
                      desc={item.desc}
                      className="absolute right-[16px] bottom-[35px]"
                      text={
                        <div className="flex items-end justify-center gap-[2px] text-[#979797] w-10 h-10">
                          <span className="text-[6px]">&#9679;</span>
                          <span className="text-[6px]">&#9679;</span>
                          <span className="text-[6px]">&#9679;</span>
                        </div>
                      }
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="mt-[15px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] lg:gap-[17px]">
          {(isLoaded ? newBlog : Array.from(new Array(30))).map((item, index) =>
            item ? (
              <NewsCard
                key={index}
                title={item.title}
                desc={item.desc}
                image={item.image}
                id={item.id}
                date={item.date}
                category={item.sports.name}
                slug={item.slug}
                link={item.sports.slug}
              />
            ) : (
              <div className="bg-white rounded-[20px] p-[10px]">
                <HStack width="full" space={3} rounded="md">
                  <Skeleton
                    h={32}
                    w={32}
                    rounded="md"
                    startColor="coolGray.200"
                    backgroundColor="coolGray.100"
                  />
                  <VStack space="2" flex={1}>
                    <Skeleton.Text
                      backgroundColor="coolGray.100"
                      startColor="coolGray.200"
                      lines={1}
                    />
                    <Skeleton.Text
                      backgroundColor="coolGray.100"
                      startColor="coolGray.200"
                      lines={1}
                    />

                    <Skeleton.Text
                      backgroundColor="coolGray.100"
                      startColor="coolGray.200"
                      lines={1}
                      marginTop={2}
                    />
                    <Skeleton.Text
                      backgroundColor="coolGray.100"
                      startColor="coolGray.200"
                      lines={1}
                    />
                    <Skeleton.Text
                      backgroundColor="coolGray.100"
                      startColor="coolGray.200"
                      lines={1}
                    />
                    <HStack space="5" alignItems="center">
                      <Skeleton
                        h="3"
                        flex="2"
                        rounded="full"
                        backgroundColor={"coolGray.100"}
                      />
                      <Skeleton
                        h="3"
                        flex="1"
                        rounded="full"
                        startColor="coolGray.400"
                        backgroundColor={"coolGray.100"}
                      />
                    </HStack>
                  </VStack>
                </HStack>
              </div>
            )
          )}
          <div className="relative">
            <img
              src={Ads}
              className="h-full w-full block object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
