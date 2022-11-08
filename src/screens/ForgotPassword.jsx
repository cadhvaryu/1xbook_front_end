import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsChevronLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { PassWord } from "../assets";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    var data = {
      email: email,
    };
    var requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    };

    await fetch(
      `${process.env.REACT_APP_API_BASE_URL}accounts/password_reset/`,
      requestOptions
    ).then((res) => console.log(res.json()))
      .then(() =>
        toast.success(
          "We Will send you the link for reset password... check you email. !!"
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
            <p className="text-[35px] leading-[16px] my-[33px] font-medium">
              Forgot Password
            </p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                className="rounded-2xl h-12 px-5"
                placeholder="Email ID / Phone No."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required={true}
              />
              <button className="rounded-2xl h-12">Submit</button>
            </form>
          </div>
          <Link
            to="/signin"
            className="text-[15px] leading-[16px] font-light text-[#838383] text-center mt-[29px]"
          >
            Back to Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
