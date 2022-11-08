import React, { useEffect, useRef, useState } from "react";
import {
  Logo,
  LogoBlack,
  MenuCloseIcon,
  MenuHomeIcon,
  MenuIcon,
  MenuLogoutIcon,
  MenuQuizIcon,
  MenuSignInIcon,
  SearchBlackIcon,
  SearchIcon,
} from "../assets";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { BsArrowUp } from "react-icons/bs";
import useClickOutside from "./useClickOutside";

const Navbar = () => {
  const { token, search, setSearch, subMenu, setSubMenu, userLogout } =
    useStateContext();

  const [sports, setSports] = useState([]);

  const [staticPage, setStaticPage] = useState([]);

  const [showSearch, setShowSearch] = useState(false);

  const [topMenu, setTopMenu] = useState(false);

  let { slug, category } = useParams();

  const navigate = useNavigate();

  const [goToUp, setGoToUp] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}sub-menu${"?sports=" + category}`
        // requestOptions
      )
        .then((response) => response.json())
        .then((result) => setSubMenu(result))
        .catch((error) => console.log("error", error));
    };
    getData();

    const getSports = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}blog-sports`
        // requestOptions
      )
        .then((response) => response.json())
        .then((result) => setSports(result))
        .then((res) => console.log(res))
        .catch((error) => console.log("error", error));
    };
    getSports();

    const getStaticPage = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}pages/getPages`
        // requestOptions
      )
        .then((response) => response.json())
        .then((result) => setStaticPage(result))
        .catch((error) => console.log("error", error));
    };
    getStaticPage();
    // eslint-disable-next-line
  }, [category]);

  window.addEventListener("scroll", () => {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 1000 ||
        document.documentElement.scrollTop > 1000
      ) {
        setGoToUp(true);
      } else {
        setGoToUp(false);
      }
    };
  });

  const TopMenuRef = useRef(null);

  useClickOutside(TopMenuRef, () => setTopMenu(false));

  return (
    <>
      <div className="bg-[#000] lg:bg-transparent w-full lg:px-[37px] 2xl:px-[150px] z-50 px-5">
        <div className="flex justify-between pt-[23px] w-full">
          <Link to="/">
            <img
              src={Logo}
              className="lg:hidden"
              width="97"
              height="29"
              alt=""
            />
            <img
              src={LogoBlack}
              className="hidden lg:block mt-[1px]"
              width="165.51"
              height="50"
              alt=""
            />
          </Link>
          <div className="flex items-center gap-3 relative">
            <img
              src={SearchIcon}
              className="w-[20px] h-[20px] lg:hidden"
              alt=""
              onClick={() => setShowSearch(!showSearch)}
            />
            <form onSubmit={() => navigate("/search")}>
              <div className="relative hidden lg:flex items-center">
                <input
                  type="text"
                  className="w-[306px] h-[40px] rounded-[10px] p-[15px] outline-0 border-0"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <img
                  src={SearchBlackIcon}
                  className="absolute text-black w-[20px] h-[20px] right-[12px] cursor-pointer"
                  alt=""
                />
              </div>
            </form>

            <Link to="/match">
              <button className="hidden lg:block w-[109px] h-[40px] rounded-[10px] bg-[#E31F29] text-white font-bold text-[15px] leading-[10px]">
                Match
              </button>
            </Link>
            {token === undefined ? (
              <Link to="/signin">
                <button className="hidden lg:block w-[109px] h-[40px] rounded-[10px] bg-[#E31F29] text-white font-bold text-[15px] leading-[10px]">
                  Login
                </button>
              </Link>
            ) : (
              <Link to="/profile">
                <button className="hidden lg:block w-[109px] h-[40px] rounded-[10px] bg-[#E31F29] text-white font-bold text-[15px] leading-[10px]">
                  Profile
                </button>
              </Link>
            )}

            <div
              className="w-[20px] h-[10px] lg:w-[49px] lg:h-[40px] lg:p-[14px] bg-black rounded-[10px] cursor-pointer"
              onClick={() => {
                setTopMenu(!topMenu);
              }}
            >
              <img
                src={MenuIcon}
                className="text-white block object-contain w-full h-full"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <nav className="sticky -top-1 bg-[#272727] lg:bg-transparent rounded-b-[10px] w-full lg:px-[37px] 2xl:px-[150px] z-50 lg:mt-[22px]">
        <div className="bg-black lg:bg-transparent w-full rounded-b-[10px]">
          <div className="sticky top-0 lg:bg-black lg:rounded-t-[10px] text-white pt-[22px] flex gap-[25px] overflow-x-scroll w-full pr-10 lg:pt-[10px]">
            <NavLink
              to="/"
              className={`ml-[23px] relative ${
                category === undefined ? "active2" : ""
              }`}
              onClick={() => window.scrollTo({ top: 0 })}
            >
              <p className="text-[15px] min-w-max leading-4 font-light mb-[18px]">
                All
              </p>
              <div className=""></div>
            </NavLink>
            {sports &&
              sports.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={`/${item.slug}`}
                    className={`relative ${
                      category === item.slug ? "active2" : ""
                    }`}
                    onClick={() => window.scrollTo({ top: 0 })}
                  >
                    <p className="text-[15px] min-w-max leading-4 font-light">
                      {item.name}
                    </p>
                    <div className=""></div>
                  </NavLink>
                );
              })}
          </div>
        </div>

        {subMenu && (
          <div
            className={`lg:bg-[#272727] text-white pt-[10px] flex gap-[25px] overflow-x-scroll pr-10 pl-5 h-[40px] rounded-b-[10px] -mt-1`}
          >
            {subMenu &&
              subMenu.map((item, index) => {
                return (
                  <NavLink
                    to={`/${item.sports.slug}/series/${item.slug}`}
                    className={`text-[15px] leading-[16px] font-light min-w-fit relative ${
                      slug === item.slug ? "text-[#e31f29] font-medium" : ""
                    }`}
                    key={index}
                    onClick={() => window.scrollTo({ top: 0 })}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
          </div>
        )}

        <form onSubmit={() => navigate("/search")}>
          <div
            className={`${
              showSearch ? "block" : "hidden"
            } lg:hidden mt-2 px-5 absolute w-full rounded-[20px] flex gap-1 z-50`}
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
      </nav>

      <div
        className={`${
          topMenu ? "block" : "hidden"
        } bg-[#E31F29] fixed top-0 right-0 bottom-0 rounded-l-[10px]`}
        style={{ zIndex: 9999 }}
        ref={TopMenuRef}
      >
        <div className="relative w-full lg:max-w-[50vh]">
          <img
            src={MenuCloseIcon}
            alt="Right Menu Close "
            className="absolute top-[30px] right-[21px] cursor-pointer"
            onClick={() => setTopMenu(!topMenu)}
          />
          <div className="ml-[37px] pt-[100px] min-w-[50vw] flex flex-col gap-[35px]">
            <NavLink
              onClick={() => (
                <>
                  {setTopMenu(!topMenu)} {window.scrollTo({ top: 0 })}
                </>
              )}
              to="/"
              className="grid grid-flow-col gap-3 items-start justify-start"
            >
              <img src={MenuHomeIcon} alt="" />
              <p className="text-[16px] leading-[16px] text-white font-medium">
                Home
              </p>
            </NavLink>
            <NavLink
              onClick={() => (
                <>
                  {setTopMenu(!topMenu)} {window.scrollTo({ top: 0 })}
                </>
              )}
              to="/quiz"
              className="grid grid-flow-col gap-3 items-start justify-start"
            >
              <img src={MenuQuizIcon} alt="" />
              <p className="text-[16px] leading-[16px] text-white font-medium">
                Play Quiz
              </p>
            </NavLink>
            {staticPage.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  onClick={() => (
                    <>
                      {setTopMenu(!topMenu)} {window.scrollTo({ top: 0 })}
                    </>
                  )}
                  to={`page/${item.slug}`}
                  className="grid grid-flow-col gap-3 items-start justify-start"
                >
                  <img src={item.icon} alt="" width={15} height={15} />
                  <p className="text-[16px] leading-[16px] text-white font-medium">
                    {item.title}
                  </p>
                </NavLink>
              );
            })}
            {token === undefined ? (
              <NavLink
                onClick={() => (
                  <>
                    {setTopMenu(!topMenu)} {window.scrollTo({ top: 0 })}
                  </>
                )}
                to="/signin"
                className="grid grid-flow-col gap-3 items-start justify-start"
              >
                <img src={MenuSignInIcon} alt="" />
                <p className="text-[16px] leading-[16px] text-white font-medium">
                  Sign In
                </p>
              </NavLink>
            ) : (
              <NavLink
                onClick={() => (
                  <>
                    {setTopMenu(!topMenu)} {window.scrollTo({ top: 0 })}
                    {setTopMenu(!topMenu)}
                    {localStorage.clear()}
                    {userLogout()}
                    {navigate("/")}
                  </>
                )}
                className="grid grid-flow-col gap-3 items-start justify-start"
              >
                <img src={MenuLogoutIcon} alt="" />
                <p className="text-[16px] leading-[16px] text-white font-medium">
                  Logout
                </p>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${
          goToUp ? "block" : "hidden"
        } cursor-pointer fixed bottom-20 lg:bottom-5 right-5 bg-[#e31f29] rounded-full z-50`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <BsArrowUp className="text-white text-xl m-2" />
      </div>
    </>
  );
};

export default Navbar;
