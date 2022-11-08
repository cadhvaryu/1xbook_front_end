import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Google, Sign } from "../assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";
import { useStateContext } from "../context/ContextProvider";

const Signin = () => {
  const navigate = useNavigate();

  const { setToken } = useStateContext();

  const [eye, setEye] = useState(true);

  const [validationError, setValidationError] = useState();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = {
      email: credentials.email,
      password: credentials.password,
    };
    var requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    };

    await fetch(
      `${process.env.REACT_APP_API_BASE_URL}accounts/login/`,
      requestOptions
    )
      .then((res) => res.json())
      .then((json) =>
        json.token === undefined ? (
          <>
            {setValidationError(json)} {navigate("/signin")}
          </>
        ) : (
          <>
            {localStorage.setItem("token", json.token)}
            {setToken(localStorage.token)}
            {navigate("/")}
          </>
        )
      )
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="px-[40px] pt-[65px] max-h-screen flex flex-col items-center">
        <div className="flex justify-center items-center max-w-fit">
          <div
            className="bg-white rounded-full text-xl p-2 absolute left-5 top-5"
            onClick={() => navigate(-1)}
          >
            <BsChevronLeft />
          </div>
          <img src={Sign} alt="" className="h-52 w-64" />
        </div>
        <div className="">
          <p className="text-[35px] leading-[16px] my-[33px] font-medium">
            Sign in
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <span className="text-xs text-red-500 m-0 ml-2 mt-2">
              {validationError && validationError.non_field_errors}
            </span>

            <input
              type="email"
              className="rounded-2xl h-12 px-5"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <div className="relative flex items-center">
              <input
                type={eye ? "password" : "text"}
                className="rounded-2xl h-12 px-5 w-full"
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <div
                className="absolute right-[19px]"
                onClick={() => setEye(!eye)}
              >
                {eye ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <Link
              to="/forgot-password"
              className="text-[10px] text-right font-light leading-[16px] text-slate-500"
            >
              Recovery Password
            </Link>
            <button className="rounded-2xl h-12 font-light">Sign in</button>
          </form>
          <div className="mt-[23px] mb-[15px] flex flex-col items-center">
            <div className="w-[270px]">
              <p className="text-[15px] leading-[16px] text-[#838383] text-center my-[36px]">
                Don’t have an account ?{" "}
                <Link to="/register" className="text-black">
                  Sign-up
                </Link>
              </p>
              <p className="flex justify-center  items-center text-[#838383] font-light text-[13px] leading-[16px] gap-[13px]">
                <span className="h-[1px] w-[60px] bg-[#c8c8c8]"></span>
                Or continue with
                <span className="h-[1px] w-[60px] bg-[#c8c8c8]"></span>
              </p>
              <div className="flex items-center justify-center gap-[12px] mt-[28px] mb-[14px]">
                <img src={Google} alt="" />
                <img src={Facebook} alt="" />
              </div>
              <p className="text-[#838383] font-light text-[10px] text-center">
                By sign in with Google or Facebook, you agree to 1xbooknews
                Terms and Privacy policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
