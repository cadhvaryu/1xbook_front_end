import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Banner } from "../assets";
import { Link } from "react-router-dom";
import { NewsCard, ScroreCard, SharePopup } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, FreeMode } from "swiper";
import { formatDistance } from "date-fns";
import { Skeleton, VStack, HStack } from "native-base";

const Home = () => {
  const [blogData, setBlogData] = useState([]);

  const { isLoaded, setIsLoaded } = useStateContext();

  const [trending, setTrending] = useState([]);
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    const getBlog = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}blog-data`
      );
      const res = await data.json();
      setBlogData(res);
      setIsLoaded(true);
    };
    getBlog();

    const filterTrending = (a) => {
      const newItem = a.filter((newVal) => {
        return newVal.trending === true;
      });
      setTrending(newItem);
    };
    filterTrending(blogData);
    const filterTopStories = (a) => {
      const newItem = a.filter((newVal) => {
        return newVal.topStories === true;
      });
      setTopStories(newItem);
    };
    filterTopStories(blogData);
    // eslint-disable-next-line
  }, []);

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

  return (
    <div className="min-h-screen mx-[18px] lg:mx-[37px] 2xl:mx-[150px]">
      <div className="overflow-x-scroll cursor-pointer">
        <ScroreCard />
      </div>

      <div className="flex justify-between mb-[15px]">
        <p className="text-[20px] leading-[16px] font-light">Recent News</p>
        <Link to="/all/recent">
          <p className="text-[14px] leading-[16px] text-[#888888] font-normal">
            Show All
          </p>
        </Link>
      </div>

      <div className="overflow-x-auto homeSlider lg:grid lg:grid-cols-6 xl:grid-cols-4 lg:gap-5 lg:min-h-[600px] md:max-h-[500px] md:h-[500px] max-h-[500px] h-[500px] lg:h-[600px] xl:max-h-[510px]">
        <div className="lg:col-span-4 xl:col-span-3">
          {isLoaded ? (
            <Swiper
              pagination={pagination}
              loop="true"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Pagination, Autoplay]}
              className=""
              spaceBetween={20}
              grabCursor={true}
            >
              {blogData.slice(0, 5).map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="bg-white pb-[43px] rounded-[20px] lg:min-h-[600px] md:max-h-[500px] md:h-[500px] lg:h-[600px] xl:max-h-[510px] max-h-[500px] h-[500px]">
                      <Link to={`/${item.sports.slug}/${item.slug}`}>
                        <img
                          src={item.image}
                          alt=""
                          className="rounded-[20px] w-full h-[312px] lg:h-[400px] block object-cover"
                        />
                        <div className="px-[16px] mt-[10px]">
                          <p className="font-medium leading-6 text-xl lg:text-[25px] slider-Title">
                            {item.title}
                          </p>
                          <p className="font-light text-[12px] mt-[10px] leading-[20px] hidden slider-Desc">
                            {item.content.replace(/<[^>]+>/g, "")}
                          </p>
                        </div>

                        <div className="absolute bottom-10 left-[16px] flex justify-between items-center mt-[10px]">
                          <div className="grid grid-flow-col justify-start items-start gap-[10px]">
                            <p className="font-light text-[12px] leading-[12px]">
                              {item.series === null ? "" : item.series.name}
                            </p>
                            <p className="font-light text-[12px] leading-[12px] flex items-center gap-[5px]">
                              <span className="text-[6px] text-[#979797]">
                                &#9679;
                              </span>
                              {item.sports.name}
                            </p>
                            <p className="font-light text-[12px] leading-[12px] flex items-center gap-[5px]">
                              <span className="text-[6px] text-[#979797]">
                                &#9679;
                              </span>
                              {item.date &&
                                formatDistance(
                                  new Date(),
                                  new Date(item.date),
                                  new Date(),
                                  { addSuffix: true }
                                )}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <SharePopup
                        url={`/${item.sports.slug}/${item.slug}`}
                        title={item.title}
                        desc={item.desc}
                        className="absolute bottom-10 right-[16px]"
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
          ) : (
            <div className="bg-white pb-[43px] rounded-[20px] lg:min-h-[600px] md:max-h-[500px] md:h-[500px] lg:h-[600px] xl:max-h-[510px] max-h-[500px] h-[500px] overflow-hidden">
              <VStack width="full" space={3} rounded="md">
                <Skeleton
                  h={"96"}
                  w={"full"}
                  rounded="md"
                  startColor="coolGray.200"
                  backgroundColor="coolGray.100"
                />
                <div className="p-2 px-4">
                  <VStack space="2" flex={1}>
                    {Array.from(new Array(8)).map((item, index) => {
                      return (
                        <Skeleton.Text
                          backgroundColor="coolGray.100"
                          startColor="coolGray.200"
                          lines={1}
                        />
                      );
                    })}

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
                </div>
              </VStack>
            </div>
          )}
        </div>
        <div className="lg:col-span-2 xl:col-span-1 hidden lg:flex flex-col gap-[10px] bg-white rounded-[25px] p-[14px] lg:min-h-[600px] max-h-[510px] overflow-y-scroll xl:max-h-[510px]">
          {(isLoaded ? blogData.slice(5, 10) : Array.from(new Array(10))).map(
            (item, index) =>
              item ? (
                <NewsCard
                  key={index}
                  id={item.id}
                  title={item.title}
                  desc={item.desc}
                  image={item && item.image}
                  date={new Date(item.date).toLocaleDateString("en-US")}
                  slug={item.slug}
                  category={item.sports.name}
                  link={item.sports.slug}
                  share={false}
                />
              ) : (
                <HStack width={"full"} space={3} rounded="md">
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
              )
          )}
        </div>
      </div>

      <div className="mt-[20px]">
        <div className="flex justify-between mb-[10px]">
          <p className="text-[20px] leading-[16px] font-light">Trending</p>
          <Link to="/all/trending">
            <p className="text-[14px] leading-[16px] text-[#888888] font-normal">
              Show All
            </p>
          </Link>
        </div>
        <Swiper
          grabCursor={true}
          modules={[FreeMode]}
          freeMode={true}
          spaceBetween={10}
          slidesPerView={"auto"}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            390: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            425: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 150,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
            },
            786: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
            1228: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            2560: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
          }}
        >
          {trending.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className="bg-white rounded-[20px] min-w-[187.2px] min-h-[218px] relative"
                  key={index}
                >
                  <Link to={`/${item.sports.slug}/${item.slug}`}>
                    <img
                      src={item && item.image}
                      alt=""
                      className="rounded-[20px] w-full h-[114.26px] block object-cover"
                    />
                    <div className="px-[16px] mt-[10px]">
                      <p className="font-medium leading-[20px] text-[14px] card-Title">
                        {item.title}
                      </p>
                    </div>

                    <div className="absolute left-[16px] bottom-[15px] flex gap-[10px]">
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
                  </Link>
                  <SharePopup
                    url={`/${item.sports.slug}/${item.slug}`}
                    title={item.title}
                    desc={item.desc}
                    className="absolute right-[16px] bottom-[15px]"
                    text={
                      <div className="flex items-center gap-[2px] text-[#979797]">
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

      <div className="mt-[20px] relative">
        <img
          src={Banner}
          className="h-40 lg:h-full w-full block object-cover rounded-[30px]"
          alt=""
        />
      </div>

      <div className="">
        <div className="flex justify-between mb-[15px] mt-[25px]">
          <p className="text-[20px] leading-[16px] font-light">Top Stories</p>
          <Link to="/all/top">
            <p className="text-[14px] leading-[16px] text-[#888888] font-normal">
              Show All
            </p>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[15px]">
          {topStories.slice(0, 3).map((item, index) => {
            return (
              <div
                className="bg-white pb-[18px] rounded-[20px] min-w-[187.2px] min-h-[339px] relative"
                key={index}
              >
                <Link to={`/${item.sports.slug}/${item.slug}`}>
                  <img
                    src={item && item.image}
                    alt=""
                    className="rounded-[20px] w-full h-[183px] lg:h-[160px] xl:h-[200px] block object-cover object-top"
                  />
                  <div className="px-[16px] mt-[10px]">
                    <p className="font-medium leading-[20px] text-[16px] card-Title">
                      {item.title}
                    </p>
                    <p className="font-light leading-[16px] text-[12px] mt-[7px] card-Desc">
                      {item.desc}
                    </p>
                  </div>
                </Link>

                <div className="absolute left-[16px] bottom-[18px] flex justify-between items-center mt-[15px] lg:mt-[32px]">
                  <div className="flex gap-[10px]">
                    <p className="font-light text-[12px] leading-[12px] flex items-center gap-[5px]">
                      {item.series === null ? "" : item.series.name}
                    </p>
                    <p className="font-light text-[12px] leading-[12px] flex items-center gap-[5px]">
                      <span className="text-[6px] text-[#979797]">&#9679;</span>
                      {item.sports.name}
                    </p>
                    <p className="font-light text-[12px] leading-[12px] flex items-center gap-[5px]">
                      <span className="text-[6px] text-[#979797]">&#9679;</span>
                      {item.date &&
                        formatDistance(
                          new Date(),
                          new Date(item.date),
                          new Date(),
                          { addSuffix: true }
                        )}{" "}
                    </p>
                  </div>
                </div>

                <SharePopup
                  className="absolute right-[16px] bottom-[18px]"
                  text={
                    <div className="flex items-end justify-center gap-[2px] text-[#979797] w-10 h-10">
                      <span className="text-[6px]">&#9679;</span>
                      <span className="text-[6px]">&#9679;</span>
                      <span className="text-[6px]">&#9679;</span>
                    </div>
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-[15px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] lg:gap-[17px]">
        {(isLoaded ? blogData : Array.from(new Array(20))).map((item, index) =>
          item ? (
            <NewsCard
              key={index}
              id={item.id}
              title={item.title}
              desc={item.desc}
              image={item && item.image}
              date={new Date(item.date).toLocaleDateString("en-US")}
              slug={item.slug}
              category={item.sports.name}
              link={item.sports.slug}
              share={true}
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
      </div>
    </div>
  );
};

export default Home;
