import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useStateContext } from "../context/ContextProvider";
import { BsChevronLeft } from "react-icons/bs";
import { LiveIcon, Team1, Team2 } from "../assets";
import SharePopup from "../components/SharePopup";

// eslint-disable-next-line
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/free-mode";
import "swiper/css";
import { FreeMode } from "swiper";

// import required modules
// eslint-disable-next-line
import {
  Footer,
  Navbar,
  NewsCard,
  ScrollToTop,
  ScroreCard,
} from "../components";
import { formatDistance } from "date-fns";
import { HStack, Skeleton, VStack } from "native-base";
import { TwitterTweetEmbed } from "react-twitter-embed";

const SingleNews = () => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  const { subMenu, blogData } = useStateContext();

  // eslint-disable-next-line
  const [singleBlog, setSingleBlog] = useState("");

  const [recentLoaded, setRecentLoaded] = useState(false);
  const [recent, setRecent] = useState([]);

  const [trendingLoaded, setTrendingLoaded] = useState(false);
  const [trending, setTrending] = useState([]);

  let { category, id } = useParams();

  const addLike = async () => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}add_like/${id}`, {
      method: "POST",
    });
    setLike(true);
  };

  // /add_like/former-india-cricketer-expresses-concern-over-yuzv

  useEffect(() => {
    const getBlog = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}blog-data?id=${id}`
      );
      const res = await data.json();
      setSingleBlog(res[0]);
    };
    getBlog();
  }, [id]);

  useEffect(() => {
    const filterRecent = (a) => {
      setRecentLoaded(false);
      const newItem = a.filter((newVal) => {
        return newVal.sports.name.toLowerCase() === category;
      });
      setRecent(newItem);
    };
    filterRecent(blogData);

    const filterTrending = (a) => {
      setTrendingLoaded(false);
      const newItem = a.filter((newVal) => {
        return newVal.trending === true;
      });
      setTrending(newItem);
    };
    filterTrending(recent);
    // eslint-disable-next-line
  }, [blogData]);

  useEffect(() => {
    if (recent.length > 1) {
      setRecentLoaded(true);
    }
    if (trending.length > 1) {
      setTrendingLoaded(true);
    }
  }, [recent, trending]);

  return (
    <div className="min-h-screen">
      <ScrollToTop>
        <div className="lg:hidden">
          {singleBlog && (
            <div className="mb-10  min-h-screen">
              <div className="sticky top-0 z-50">
                <div
                  className="bg-white rounded-full w-8 h-8 flex justify-center items-center absolute top-[26px] left-[23px] hover:cursor-pointer z-10 drop-shadow-md"
                  onClick={() => navigate(-1)}
                >
                  <BsChevronLeft className="text-xl" />
                </div>
                <div className="rounded-full flex gap-5 absolute top-[26px] right-[23px] z-10 drop-shadow-md">
                  <SharePopup
                    title={singleBlog && singleBlog.title}
                    desc={singleBlog && singleBlog.desc}
                    // url={singleBlog && singleBlog.slug}
                    url={`/${singleBlog.sports.slug}/${singleBlog.sports.slug}`}
                    text={
                      <p className="bg-white font-light text-[13px] leading-[13px] rounded-[10px] w-[51px] h-[25px] flex items-center justify-center">
                        Share
                      </p>
                    }
                    id={singleBlog && singleBlog.id}
                  />
                  <div className="relative bg-white rounded-[10px]">
                    <div
                      className={`heart ${like ? "is-active" : ""}`}
                      onClick={() =>
                        like === false ? addLike() : setLike(false)
                      }
                    ></div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={singleBlog && singleBlog.image}
                  className="rounded-b-[30px] h-[444px] w-full block object-cover"
                  alt=""
                />
                <div className="flex gap-[10px] mt-[14px] overflow-x-scroll absolute -bottom-[68px] w-screen px-[23px]">
                  <div className="bg-white rounded-[20px] min-w-[311px] p-[15px]">
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
                  <div className="bg-white rounded-[20px] min-w-[311px] p-[15px]">
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
                </div>
              </div>
              <div className="flex">
                <div className="mx-[23px] bg-white px-[15px] py-[22px] rounded-[25px] overflow-hidden mt-[85px]">
                  <p className="font-medium text-[18px]">
                    {singleBlog && singleBlog.title}
                  </p>
                  <p className="mt-[5px] mb-[10px] font-light text-[12px] leading-[18px]">
                    By
                    {singleBlog && " " + singleBlog.blog_Author.name} | Updated
                    on{" "}
                    {singleBlog.date &&
                      formatDistance(
                        new Date(),
                        new Date(singleBlog.date),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}{" "}
                  </p>
                  <p className="">
                    {singleBlog &&
                      parse(singleBlog.content, {
                        replace: (domNode) => {
                          if (
                            domNode.attribs &&
                            domNode.attribs.id === "tweetid"
                          ) {
                            return (
                              <>
                                {/* <a href={domNode.attribs.href + "?ref_src=twsrc%5Etfw"}></a> */}
                                {domNode.attribs.href.replace(/\D/g, "")}
                                <TwitterTweetEmbed
                                  tweetId={domNode.attribs.href.replace(
                                    /\D/g,
                                    ""
                                  )}
                                />
                              </>
                            );
                          }
                        },
                      })}
                  </p>
                  <div className="flex !overflow-x-scroll mt-[15px] gap-[5px]">
                    {singleBlog.tags.map((item, index) => {
                      return (
                        <p
                          className="min-w-fit bg-[#D9D9D9] rounded-[5px] px-[9px] text-[14px] leading-[16px] font-light p-[5px]"
                          key={index}
                        >
                          {item.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mx-[23px] mt-[20px]">
                <div className="flex justify-between mb-[10px]">
                  <p className="text-[20px] leading-[16px] font-light">
                    Trending
                  </p>
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
                  loop="true"
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
                  {recent.slice(0, 10).map((item, index) => {
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
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          <Navbar />
          <div className="px-[37px] 2xl:px-[150px]">
            <ScroreCard />
          </div>
          <div className="min-h-screen">
            <div className="flex gap-[23px] px-[37px] 2xl:px-[150px] mb-10">
              {singleBlog ? (
                <div className="relative bg-white w-[70%] rounded-[30px]">
                  <div
                    className="bg-white rounded-full w-8 h-8 flex justify-center items-center absolute top-[26px] left-[23px] hover:cursor-pointer z-10 drop-shadow-md"
                    onClick={() => navigate(-1)}
                  >
                    <BsChevronLeft className="text-xl" />
                  </div>
                  <div className="rounded-full flex items-center gap-5 absolute top-[26px] right-[23px] z-10">
                    <SharePopup
                      title={singleBlog && singleBlog.title}
                      desc={singleBlog && singleBlog.desc}
                      url={`/${singleBlog.sports.category}/${id}`}
                      text={
                        <p className="bg-white font-light text-[13px] leading-[13px] rounded-[10px] w-[51px] h-[25px] flex items-center justify-center">
                          Share
                        </p>
                      }
                      id={singleBlog && singleBlog.id}
                    />
                    <div className="relative bg-white rounded-[10px]">
                      <div
                        className={`heart ${like ? "is-active" : ""}`}
                        onClick={() =>
                          like === false ? addLike() : setLike(false)
                        }
                      ></div>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={singleBlog && singleBlog.image}
                      className="rounded-[30px] h-[444px] w-full block object-cover"
                      alt=""
                    />
                  </div>
                  <div className="flex">
                    <div className="mx-[23px] px-[15px] py-[22px] rounded-[25px] overflow-hidden">
                      <p className="my-2 flex gap-1 items-center text-[12px] leading-[20px] font-medium">
                        {singleBlog && singleBlog.sports.name}
                        {singleBlog && singleBlog.series === null
                          ? ""
                          : " > " + singleBlog.series.name}
                      </p>
                      <p className="font-medium text-[32px] leading-[40px]">
                        {singleBlog && singleBlog.title}
                      </p>
                      <p className="mt-[5px] mb-[10px] font-light text-[12px] leading-[18px]">
                        By
                        {singleBlog && " " + singleBlog.blog_Author.name} |
                        Updated on{" "}
                        {singleBlog.date &&
                          formatDistance(
                            new Date(),
                            new Date(singleBlog.date),
                            new Date(),
                            {
                              addSuffix: true,
                            }
                          )}
                      </p>
                      <p>
                        {"https://twitter.com/NorthFoxGroup/status/1517967328281239552".replace(
                          /\D/g,
                          ""
                        )}
                      </p>
                      <p className="">
                        {parse(singleBlog.content, {
                          replace: (domNode) => {
                            if (
                              domNode.attribs &&
                              domNode.attribs.id === "tweetid"
                            ) {
                              return (
                                <>
                                  {/* <a href={domNode.attribs.href + "?ref_src=twsrc%5Etfw"}></a> */}
                                  {domNode.attribs.href.replace(/\D/g, "")}
                                  <TwitterTweetEmbed
                                    tweetId={domNode.attribs.href.replace(
                                      /\D/g,
                                      ""
                                    )}
                                  />
                                </>
                              );
                            }
                          },
                        })}
                      </p>
                      <div className="flex !overflow-x-scroll mt-[15px] gap-[5px]">
                        {singleBlog.tags.map((item, index) => {
                          return (
                            <p
                              className="min-w-fit bg-[#D9D9D9] rounded-[5px] px-[9px] text-[14px] leading-[16px] font-light p-[5px]"
                              key={index}
                            >
                              {item.name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-[70%] flex gap-[23px] px-[37px] 2xl:px-[150px] mb-10">
                  <VStack w={"full"} space={3} rounded="md">
                    <Skeleton
                      h={"96"}
                      w={"full"}
                      rounded="md"
                      startColor="coolGray.200"
                      backgroundColor="coolGray.100"
                    />
                    <VStack space="2" flex={1}>
                      {Array.from(new Array(20)).map((item) => {
                        return (
                          <Skeleton.Text
                            backgroundColor="coolGray.100"
                            startColor="coolGray.200"
                            lines={1}
                          />
                        );
                      })}
                      <HStack space="5" alignItems="self-start">
                        {Array.from(new Array(3)).map((item) => {
                          return (
                            <Skeleton
                              h="3"
                              w="16"
                              rounded="full"
                              backgroundColor={"coolGray.100"}
                            />
                          );
                        })}
                      </HStack>
                    </VStack>
                  </VStack>
                </div>
              )}
              <div className="w-[30%]">
                <div className="">
                  <p className="text-[18px] leading-[16px] font-medium mt-2 flex gap-[7px] items-center">
                    <span className="w-[7px] h-[18px] rounded-[10px] bg-[#E31F29] block"></span>{" "}
                    Tournaments
                  </p>

                  <div className="bg-white rounded-[20px] h-[361px] mt-[19px] py-[15px]">
                    {(subMenu ? subMenu : Array.from(new Array(10))).map(
                      (item, index) =>
                        item ? (
                          <Link
                            to={`/${category}/series/${item.slug}`}
                            key={index}
                          >
                            <div className="border-b px-[21px] pb-[5px]">
                              <p className="text-[13px] font-medium leading-[18px]">
                                {item.name}
                              </p>
                              <p className="text-[13px] font-medium leading-[18px]">
                                {item.startDate}
                              </p>
                            </div>
                          </Link>
                        ) : (
                          <>
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
                          </>
                        )
                    )}
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-[18px] leading-[16px] font-medium mt-2 flex gap-[7px] items-center">
                    <span className="w-[7px] h-[18px] rounded-[10px] bg-[#E31F29] block"></span>{" "}
                    Trending
                  </p>

                  <div className="lg:col-span-2 xl:col-span-1 hidden lg:flex flex-col gap-[10px] bg-white rounded-[25px] p-[14px] lg:min-h-[600px] max-h-[510px] overflow-y-scroll xl:max-h-[510px] mt-[19px]">
                    {(trendingLoaded
                      ? trending.slice(0, 10)
                      : Array.from(new Array(10))
                    ).map((item, index) =>
                      item ? (
                        <div className="" key={index}>
                          <NewsCard
                            id={item.id}
                            title={item.title}
                            desc={item.desc}
                            image={item && item.image}
                            date={new Date(item.date).toLocaleDateString(
                              "en-US"
                            )}
                            slug={item.slug}
                            category={item.sports.name}
                            link={item.sports.slug}
                          />
                        </div>
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
              </div>
            </div>

            <div className="px-[37px] 2xl:px-[150px]">
              <div className="flex justify-between mb-[10px]">
                <p className="text-[20px] leading-[16px] font-light">
                  Releted News
                </p>
                <Link to="/all/trending">
                  <p className="text-[14px] leading-[16px] text-[#888888] font-normal">
                    Show All
                  </p>
                </Link>
              </div>
              {recentLoaded ? (
                <Swiper
                  grabCursor={true}
                  modules={[FreeMode]}
                  freeMode={true}
                  spaceBetween={10}
                  slidesPerView={"auto"}
                  loop="true"
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
                  {recent.slice(0, 10).map((item, index) => {
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
              ) : (
                <Swiper
                  grabCursor={true}
                  modules={[FreeMode]}
                  freeMode={true}
                  spaceBetween={10}
                  slidesPerView={"auto"}
                  loop="true"
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
                  {Array.from(new Array(10)).map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="bg-white rounded-[20px] p-[10px]">
                          <VStack width="full" space={3} rounded="md">
                            <Skeleton
                              h={"24"}
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
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </ScrollToTop>
    </div>
  );
};

export default SingleNews;
