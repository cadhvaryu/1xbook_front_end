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

const NewsPage = () => {
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

  const { category } = useParams();

  const [newBlog, setNewBlog] = useState([]);
  const { isLoaded, setIsLoaded } = useStateContext();

  const [trendingLoaded, setTrendingLoaded] = useState(false);
  const [trending, setTrending] = useState([]);
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    const getData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}blog-data?category=${category}`
        // requestOptions
      )
        .then((response) => response.json())
        .then((result) => setNewBlog(result))
        .catch((error) => console.log("error", error));
      setIsLoaded(true);
    };
    getData();
    // eslint-disable-next-line
  }, [category]);

  useEffect(() => {
    const filterTrending = (a) => {
      const newItem = a.filter((newVal) => {
        return newVal.trending === true;
      });
      setTrending(newItem);
    };
    filterTrending(newBlog);

    const filterTopStories = (a) => {
      const newItem = a.filter((newVal) => {
        return newVal.topStories === true;
      });
      setTopStories(newItem);
    };
    filterTopStories(newBlog);
  }, [newBlog]);

  useEffect(() => {
    if (trending.length > 1) {
      setTrendingLoaded(true);
    }
  }, [trending]);

  return (
    <div className="min-h-screen">
      {newBlog && (
        <div className="px-[16px] lg:px-[37px] 2xl:px-[150px]">
          <ScroreCard className="hidden lg:flex" />
          <div className="homeSlider newsSlide max-h-fit mt-[25px]">
            <div className="flex justify-between mb-[15px]">
              <p className="text-[20px] leading-[16px] font-light">Trending</p>
              <Link to={`/${category}/all/trending`}>
                <p className="text-[14px] leading-[16px] text-[#888888] font-normal">
                  Show All
                </p>
              </Link>
            </div>
            {trendingLoaded ? (
              <Swiper
                initialSlide="3"
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
                {trending.slice(0, 5).map((item, index) => {
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
            ) : (
              <>
                <div className="bg-white rounded-[20px] h-[400px] w-full overflow-hidden md:block hidden">
                  <HStack>
                    <Skeleton
                      h={"full"}
                      w={"1/2"}
                      rounded="md"
                      startColor="coolGray.200"
                      backgroundColor="coolGray.100"
                    />
                    <div className="p-5 w-full">
                      <VStack space="2" flex={1}>
                        {Array.from(new Array(15)).map((item, index) => {
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
                  </HStack>
                </div>

                <div className="bg-white rounded-[20px] h-[400px] overflow-hidden md:hidden">
                  <Skeleton
                    h={"1/2"}
                    w={"full"}
                    rounded="md"
                    startColor="coolGray.200"
                    backgroundColor="coolGray.100"
                  />
                  <div className="p-5 w-full">
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
                </div>
              </>
            )}
          </div>

          <div className="mt-[15px] grid grid-cols-1 lg:grid-cols-3 gap-[10px] lg:gap-[17px]">
            {(isLoaded ? newBlog.slice(5, 8) : Array.from(new Array(3))).map(
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

          <div className="hidden md:block my-5">
            <p className="text-[20px] leading-[16px] font-light mb-[5px] md:mb-[10px]">
              Top Stories
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px]">
              {(isLoaded
                ? topStories.slice(0, 3)
                : Array.from(new Array(3))
              ).map((item, index) =>
                item ? (
                  <div
                    className="bg-white pb-[18px] rounded-[20px] min-w-[187.2px] min-h-[340px] relative"
                    key={index}
                  >
                    <Link to={`/${item.sports.slug}/${item.slug}`}>
                      <img
                        src={item.image}
                        alt=""
                        className="rounded-[20px] w-full h-[160px] block object-cover"
                      />
                    </Link>
                    <div className="px-[16px] mt-[10px] relative">
                      <Link to={`/${item.sports.slug}/${item.slug}`}>
                        <p className="font-medium leading-6 text-xl card-Title">
                          {item.title}
                        </p>
                        <p className="font-light text-[12px] mt-[10px] leading-[20px] card-Desc2">
                          {item.desc}
                        </p>
                      </Link>
                    </div>

                    <div className="grid grid-flow-col justify-start items-start gap-[10px] absolute bottom-[15px] left-[15px]">
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
                          )}{" "}
                      </p>
                    </div>

                    <SharePopup
                      title={item.title}
                      desc={item.desc}
                      url={`/${item.sports.slug}/${item.slug}`}
                      className="absolute right-[16px] bottom-[15px]"
                      text={
                        <div className="flex items-end justify-center gap-[2px] text-[#979797] w-10 h-10">
                          <span className="text-[6px]">&#9679;</span>
                          <span className="text-[6px]">&#9679;</span>
                          <span className="text-[6px]">&#9679;</span>
                        </div>
                      }
                      id={item.id}
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-[20px] p-[10px]">
                    <VStack width="full" space={3} rounded="md">
                      <Skeleton
                        h={48}
                        w={"full"}
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
                    </VStack>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-[15px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] lg:gap-[17px]">
            {(isLoaded ? newBlog : Array.from(new Array(30))).map(
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
          <div className="relative rounded-[30px] mt-[20px]">
            <img
              src={Ads}
              className="h-[30vh] w-full block object-cover rounded-[30px]"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
