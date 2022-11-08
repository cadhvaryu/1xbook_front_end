import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  ProfileLock,
  ProfileLogout,
  ProfileUsers,
  UserProfile,
} from "../assets";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useStateContext } from "../context/ContextProvider";

const Profile = () => {
  const navigate = useNavigate();

  const { userProfile, userLogout } = useStateContext();

  return (
    <>
      {localStorage.token === undefined ? (
        navigate("/signin")
      ) : (
        <>
          {userProfile && (
            <>
              <div className="bg-black w-full grid grid-flow-col text-white h-[91px] items-center justify-between gap-[17px] px-[23px] rounded-b-[20px]">
                <div className="flex items-center justify-center">
                  <BsChevronLeft
                    className="text-3xl"
                    onClick={() => navigate(-1)}
                  />
                  <p className="font-medium text-[18px] leading-[16px]">
                    Profile
                  </p>
                </div>
              </div>
              <div className="mt-[27px] mx-[22px] flex flex-col items-center gap-[9px]">
                <div className="flex flex-col gap-[9px] min-w-fit">
                  <div className="bg-white h-[74px] grid grid-flow-col items-center rounded-l-[40px] rounded-r-[15px] p-[8px] justify-start gap-[15px]">
                    <img src={UserProfile} alt="" />
                    <p className="text-[18px] leading-[16px] font-medium">
                      {userProfile && userProfile.name === "" ? "Your Name Here"
                        : userProfile.name}
                    </p>
                  </div>
                  <div className="bg-white rounded-[15px] h-[49px] px-[14px] grid grid-flow-col items-center justify-start gap-[18px]">
                    <FaPhoneAlt className="" />
                    <p>{userProfile.mobile}</p>
                  </div>
                  <div className="bg-white rounded-[15px] h-[49px] px-[14px] grid grid-flow-col items-center justify-start gap-[18px]">
                    <FaEnvelope className="" />
                    <p>{userProfile.email}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-[9px]">
                    <div className="bg-white rounded-[15px] h-[85px] flex flex-col justify-center items-center gap-[12px] text-center">
                      <p className="text-[20px] leading-[16px] font-medium">
                        14847
                      </p>
                      <p className="text-[15px] leading-[16px] font-light">
                        Liked
                      </p>
                    </div>
                    <div className="bg-white rounded-[15px] h-[85px] flex flex-col justify-center items-center gap-[12px] text-center">
                      <p className="text-[20px] leading-[16px] font-medium">
                        14
                      </p>
                      <p className="text-[15px] leading-[16px] font-light">
                        Match Predicted
                      </p>
                    </div>
                    <div className="bg-white rounded-[15px] h-[85px] flex flex-col justify-center items-center gap-[12px] text-center">
                      <p className="text-[20px] leading-[16px] font-medium">
                        8
                      </p>
                      <p className="text-[15px] leading-[16px] font-light">
                        Quiz
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-[15px] h-[49px] px-[14px] grid grid-flow-col items-center justify-start gap-[18px]">
                    <img src={ProfileLock} alt="" />
                    <p>Change Password</p>
                  </div>
                  <div className="bg-white rounded-[15px] h-[49px] px-[14px] grid grid-flow-col items-center justify-start gap-[18px]">
                    <img src={ProfileUsers} alt="" />
                    <p>Tell Your Friend</p>
                  </div>
                  <div
                    className="bg-white rounded-[15px] h-[49px] px-[14px] grid grid-flow-col items-center justify-start gap-[18px] cursor-pointer"
                    onClick={() => (
                      <>
                        {userLogout()}
                        {navigate("/")}
                      </>
                    )}
                  >
                    <img src={ProfileLogout} alt="" />
                    <p>Log out</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
