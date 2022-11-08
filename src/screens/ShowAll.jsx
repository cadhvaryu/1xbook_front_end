import React, { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { SearchIcon } from "../assets";
import { ScrollToTop } from "../components";
import NewsCard from "../components/NewsCard";
import { useStateContext } from "../context/ContextProvider";

const ShowAll = () => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const { search, setSearch } = useStateContext();

  useEffect(() => {
    const getData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}blog-data?blogtype=${slug}`
        // requestOptions
      )
        .then((response) => response.json())
        .then((result) => setBlog(result))
        .catch((error) => console.log("error", error));
    };
    getData();

    if (category !== "") {
      const filterCategory = (a) => {
        const newItem = a.filter((newVal) => {
          return newVal.sports.name === category;
        });
        setBlog(newItem);
      };
      filterCategory(blog);
    }
    // eslint-disable-next-line
  }, [slug]);
  // console.log(blog);

  return (
    <>
      <ScrollToTop>
        <div className="min-h-screen">
          <div className="bg-black w-full grid grid-flow-col text-white h-[91px] items-center justify-between gap-[17px] px-[23px] rounded-b-[20px]">
            <div className="flex items-center justify-center">
              <BsChevronLeft
                className="text-3xl"
                onClick={() => navigate(-1)}
              />
              <p className="font-medium text-[18px] leading-[16px]">
                {slug.charAt(0).toUpperCase() + slug.slice(1)} Stories
              </p>
            </div>
            <img
              src={SearchIcon}
              className="w-[20px] h-[20px] lg:hidden"
              alt=""
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>
          <form onSubmit={() => navigate("/search")}>
            <div
              className={`${
                showSearch ? "block" : "hidden"
              } lg:hidden mt-2 px-5 absolute w-full rounded-[20px] flex gap-1`}
            >
              <input
                type="text"
                className="px-5 w-full rounded-[20px] h-[35px] focus:outline-none focus:border-0 drop-shadow-md"
                placeholder="Search..."
                value={search}
                autoFocus={true}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="rounded-full flex items-center w-[40px] h-[35px] justify-center p-0">
                <img
                  src={SearchIcon}
                  alt=""
                  className="w-[20px] h-[20px] max-w-[20px] max-h-[20px]"
                />
              </button>
            </div>
          </form>

          <div className="mt-[40px] mx-[23px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
            {blog.map((item, index) => {
              return (
                <NewsCard
                  id={item.id}
                  title={item.title}
                  desc={item.desc}
                  image={item.image}
                  key={index}
                  link={item.sports.slug}
                  slug={item.slug}
                  date={new Date(item.date).toLocaleDateString("en-US")}
                  category={item.sports.name}
                />
              );
            })}
          </div>
        </div>
      </ScrollToTop>
    </>
  );
};

export default ShowAll;
