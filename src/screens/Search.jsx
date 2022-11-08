import React, { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { SearchBlackIcon } from "../assets";
import NewsCard from "../components/NewsCard";
import SearchLoader from "../components/SearchLoader";
import { useStateContext } from "../context/ContextProvider";

const Search = () => {
  const { search, setSearch } = useStateContext();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [searchContent, setSearchContent] = useState([]);

  const getSearch = async () => {
    setSearchContent("");
    await fetch(
      `${process.env.REACT_APP_API_BASE_URL}blog-search?search=${search}`
    )
      .then((res) => res.json())
      .then((data) => setSearchContent(data))
      .then(() => setLoader(false));
  };

  useEffect(() => {
    getSearch();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="bg-black w-full text-white h-[91px] flex items-center justify-start px-[23px] rounded-b-[20px] gap-[15px]">
        <BsChevronLeft className="text-3xl" onClick={() => navigate(-1)} />
        <div className="relative w-full flex items-center">
          <input
            type="text"
            className="w-full h-[40px] rounded-[20px] text-black px-3"
            autoFocus={true}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onKeyUp={() => getSearch()}
          />
          <img src={SearchBlackIcon} alt="" className="absolute right-[20px]" />
        </div>
      </div>
      {loader ? (
        <div className="p-[23px]">
          <SearchLoader />
        </div>
      ) : (
        <>
          <div className="mt-[15px] px-[18px] lg:px-[37px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] h-full pb-10 min-h-screen">
            {searchContent &&
              searchContent.map((item, index) => {
                return (
                  <NewsCard
                    title={item.title}
                    desc={item.desc}
                    image={item.image}
                    id={item.id}
                    category={item.sports.name}
                    date={new Date(item.date).toLocaleDateString("en-US")}
                    link={item.sports.slug}
                  />
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Search;
