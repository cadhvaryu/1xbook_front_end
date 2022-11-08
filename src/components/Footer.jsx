import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FooterLogo,
  HomeMenu,
  MatchMenu,
  QuizeMenu,
  SignInMenu,
  UserMenu,
} from "../assets";
// eslint-disable-next-line
import { useStateContext } from "../context/ContextProvider";
// import {
//   WhatsappShareButton,
//   WhatsappIcon,
//   TwitterIcon,
//   TwitterShareButton,
//   FacebookIcon,
//   FacebookShareButton,
//   FacebookMessengerIcon,
//   FacebookMessengerShareButton,
//   TelegramIcon,
//   TelegramShareButton,
//   LinkedinIcon,
//   LinkedinShareButton,
//   EmailShareButton,
//   EmailIcon,
// } from "react-share";

import { FaArrowRight, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

const Footer = () => {
  // eslint-disable-next-line
  const { token } = useStateContext();

  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [notify, setNotify] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();

    const data = {
      email: subscribeEmail,
    };

    await fetch(`${process.env.REACT_APP_API_BASE_URL}forms/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => setSubscribeEmail(""))
      .then(() => setNotify(true))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="" style={{ zIndex: 999999999 }}>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
      <div className="lg:hidden mt-20">
        {/* <div
          className={`bg-[#2C3E50] rounded-t-[10px] h-[150px] w-full fixed bottom-0 items-center gap-5 overflow-x-scroll left-0 px-5 ${
            shareBox ? "flex" : "hidden"
          }`}
          id="box"
          style={{ zIndex: 100 }}
        >
          <WhatsappShareButton
            url={
              process.env.REACT_APP_SITE_ADDRESS + "/singleBlog/" + shareBlogId
            }
            className="flex flex-col items-center gap-3"
            onClick={() => setShareBox(false)}
          >
            <WhatsappIcon className="rounded-full w-14 h-14" />
            <p className="text-white font-bold">WhatsApp</p>
          </WhatsappShareButton>

          <FacebookShareButton
            url={
              process.env.REACT_APP_SITE_ADDRESS + "/singleBlog/" + shareBlogId
            }
            className="flex flex-col items-center gap-3"
            onClick={() => setShareBox(false)}
          >
            <FacebookIcon className="rounded-full w-14 h-14" />
            <p className="text-white font-bold">Facebook</p>
          </FacebookShareButton>

          <TwitterShareButton
            url={
              process.env.REACT_APP_SITE_ADDRESS + "/singleBlog/" + shareBlogId
            }
            className="flex flex-col items-center gap-3"
            onClick={() => setShareBox(false)}
          >
            <TwitterIcon className="rounded-full w-14 h-14" />
            <p className="text-white font-bold">Twitter</p>
          </TwitterShareButton>

          <EmailShareButton
            url={
              process.env.REACT_APP_SITE_ADDRESS + "/singleBlog/" + shareBlogId
            }
            className="flex flex-col items-center gap-3"
            onClick={() => setShareBox(false)}
          >
            <EmailIcon className="rounded-full w-14 h-14" />
            <p className="text-white font-bold">Telegram</p>
          </EmailShareButton>

          <LinkedinShareButton
            url={
              process.env.REACT_APP_SITE_ADDRESS + "/singleBlog/" + shareBlogId
            }
            className="flex flex-col items-center gap-3"
            onClick={() => setShareBox(false)}
          >
            <LinkedinIcon className="rounded-full w-14 h-14" />
            <p className="text-white font-bold">Linkedin</p>
          </LinkedinShareButton>

          <TelegramShareButton
            url={
              process.env.REACT_APP_SITE_ADDRESS + "/singleBlog/" + shareBlogId
            }
            className="flex flex-col items-center gap-3"
            onClick={() => setShareBox(false)}
          >
            <TelegramIcon className="rounded-full w-14 h-14" />
            <p className="text-white font-bold">Telegram</p>
          </TelegramShareButton>

          <FacebookMessengerShareButton
            url={
              process.env.REACT_APP_SITE_ADDRESS + "/singleBlog/" + shareBlogId
            }
            className="flex flex-col items-center gap-3"
            onClick={() => setShareBox(false)}
          >
            <FacebookMessengerIcon className="rounded-full w-14 h-14" />
            <p className="text-white font-bold">Messanger</p>
          </FacebookMessengerShareButton>
        </div> */}

        <div
          className="bg-[#E31F29] pt-[14px] pb-[7px] rounded-t-[20px] fixed bottom-0 w-screen"
          style={{ zIndex: 99 }}
        >
          <div className="flex justify-evenly">
            <NavLink
              to="/"
              className="flex flex-col items-center justify-between"
            >
              <img src={HomeMenu} alt="" />
              <p className="text-[10px] leading-[15px] font-medium mt-[4px] text-white">
                Home
              </p>
            </NavLink>
            <NavLink
              to="/"
              className="flex flex-col items-center justify-between"
            >
              <img src={MatchMenu} alt="" />
              <p className="text-[10px] leading-[15px] font-medium mt-[4px] text-white">
                Match
              </p>
            </NavLink>
            <NavLink
              to="/quiz"
              className="flex flex-col items-center justify-between"
            >
              <img src={QuizeMenu} alt="" />
              <p className="text-[10px] leading-[15px] font-medium mt-[4px] text-white">
                Play Quiz
              </p>
            </NavLink>
            {token === undefined ? (
              <NavLink
                to="/signin"
                className="flex flex-col items-center justify-between"
              >
                <img src={SignInMenu} alt="" />
                <p className="text-[10px] leading-[15px] font-medium mt-[4px] text-white">
                  Sign-In
                </p>
              </NavLink>
            ) : (
              <NavLink
                to="/profile"
                className="flex flex-col items-center justify-between"
              >
                <img src={UserMenu} alt="" />
                <p className="text-[10px] leading-[15px] font-medium mt-[4px] text-white">
                  Profile
                </p>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20 hidden bottom-0 lg:flex bg-[#E31F29] pt-[14px] pb-[7px] rounded-t-[20px] w-screen flex-col items-center">
        <div className="grid grid-cols-4 mx-[200px] mt-[27px]">
          <div className="">
            <img src={FooterLogo} className="w-[130px] h-[41px]" alt="" />
            <p className="mt-[29px] text-[18px] leading-[22px] font-light text-white">
              Follow Us On{" "}
            </p>
            <div className="flex gap-[20px] mt-[4px]">
              <FaInstagram className="h-[22px] w-[22px]" />
              <FaFacebookF className="h-[22px] w-[22px]" />
            </div>
          </div>
          <div className="text-[18px] leading-[35px] font-light text-white">
            <p>
              <Link to="/about">About Us</Link>
            </p>
            <p>
              <Link to="/career">Careers</Link>
            </p>
            <p>
              <Link to="/affiliate-write-for-us">Affilliate Writing</Link>
            </p>
            <p>
              <Link to="/">Ranking</Link>
            </p>
          </div>
          <div className="text-[18px] leading-[35px] font-light text-white">
            <p>
              <Link to="/dmca">DMCA</Link>
            </p>
            <p>
              <Link to="/disclaimer">Disclaimer</Link>
            </p>
            <p>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </p>
            <p>
              <Link to="/terms-conditions">Terms & Conditions</Link>
            </p>
          </div>
          <div className="">
            <p className="text-[16px] leading-[40px] font-medium text-white">
              Subscrive to Newsletter
            </p>
            <form onSubmit={subscribe}>
              <div className="grid grid-flow-col gap-[5px]">
                <input
                  type="email"
                  required={true}
                  className="rounded-[15px] h-[29px] w-full focus:border-none focus:outline-none px-3"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                />
                <button className="w-[36px] h-[29px] bg-white rounded-[15px] flex justify-center items-center">
                  <FaArrowRight className="text-black" />
                </button>
              </div>
              {notify && (
                <>
                  <p className="text-sm mt-3 text-white">
                    Your email has been subscribed for our Newsletter...
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
        <div className="bg-black h-[1px] w-[90vw] mt-[9px] mb-[20px]"></div>
        <p className="text-center font-light text-[8px] leading-[15px] w-[944px] text-white mb-[38px]">
          © 2021 - 2022 1XBOOK NEWS - RADIO WEB BROADCAST LIMITED (HONG KONG) |
          ALL RIGHTS RESERVED. DISCLAIMER : 1XBOOK NEWS IS A NEWS WEBSITE
          FOCUSING SOLELY ON DISSEMINATION OF SPORTS NEWS AND RELATED TOPICS AND
          EVENTS. ALL THE INFORMATION ON THIS WEBSITE IS PUBLISHED IN GOOD FAITH
          AND FOR GENERAL INFORMATION PURPOSE ONLY.
        </p>
      </div>
    </>
  );
};

export default Footer;
