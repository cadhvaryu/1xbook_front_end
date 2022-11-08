import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsChevronLeft } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { PassWord } from "../assets";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [eye, setEye] = useState(true);

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    var data = {
      token: token,
      password: password,
    };
    var requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    };

    await fetch(
      `${process.env.REACT_APP_API_BASE_URL}accounts/password_reset/confirm/`,
      requestOptions
    )
      .then((res) => console.log(res.json()))
      .then(() =>
        toast.success(
          "Password Changes Successfully"
        )
      )
      .then(() => navigate("/"))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="px-[40px] pt-[65px] max-h-screen flex flex-col items-center">
        <div className="flex flex-col justify-center items-center max-w-fit">
          <div
            className="bg-white rounded-full text-xl p-2 absolute left-5 top-5"
            onClick={() => navigate(-1)}
          >
            <BsChevronLeft />
          </div>
          <div className="flex justify-center items-center">
            <img src={PassWord} alt="" className="h-52 w-72" />
          </div>

          <div className="w-full">
            <p className="text-[25px] leading-[16px] my-[33px] font-medium">
              Enter Your New Password
            </p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="relative flex items-center">
                <input
                  type={eye ? "password" : "text"}
                  className="rounded-2xl h-12 px-5 tracking-widest w-full"
                  placeholder="* * * * * *"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required={true}
                />
                <div
                  className="absolute right-[19px]"
                  onClick={() => setEye(!eye)}
                >
                  {eye ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              <button className="rounded-2xl h-12">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
