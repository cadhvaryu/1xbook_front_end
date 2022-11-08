import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { QuizEmpty } from "../assets";
import parse from "html-react-parser";

const Quiz = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");

  const [credentials, setCredentials] = useState({
    question1: "",
    question2: "",
    name: "",
    phone: "",
    email: "",
  });

  let name, value;

  const quizId = useRef("");

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var id = quizId.current.value;
    const data = {
      ans1: credentials.question1,
      ans2: credentials.question1,
      question: id,
      name: credentials.name,
      phone: credentials.phone,
      email: credentials.email,
    };
    await fetch(`${process.env.REACT_APP_API_BASE_URL}quiz/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(navigate("/thank-you"));
  };

  useEffect(() => {
    const getStaticData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}quiz/questions?q=${slug}`
      )
        .then((res) => res.json())
        .then((data) => setQuestion(data));
    };
    getStaticData();
  }, [slug]);

  return (
    <>
      {question.length === 0 ? (
        <div className="min-h-screen">
          {/* <div className="m-[21px]">
            <div className="flex flex-col items-center justify-center w-full h-[70vh]">
              <div className="w-full lg:w-[30%] flex flex-col justify-center items-center gap-10">
                <img src={QuizEmpty} alt="" className="w-1/2" />
                <p className="text-[25px] leading-[31px] font-medium">
                  No Any Quiz for Today
                </p>
              </div>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="m-[21px] mt-0">
          <div className="flex flex-col items-center">
            <div className="w-full lg:w-[30%]">
              <img
                src={question[0].image}
                alt=""
                className="lg:h-[40vh] w-full rounded-[50px] block object-contain"
              />

              <div className="mt-[11px] mb-[40px]">
                <p className="text-[35px] leading-[42.36px] font-normal">
                  {question[0].title}
                </p>
                <p className="">
                  {parse(question[0].desc)}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-[10px] flex flex-col gap-[18px]"
              >
                <input
                  type="hidden"
                  value={question[0].id}
                  name="id"
                  ref={quizId}
                  required={true}
                />
                <div className="">
                  <p className="text-[15px] leading-[20px] font-medium">
                    {question[0].question1}
                  </p>
                  <input
                    className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]"
                    type="text"
                    name="question1"
                    value={credentials.question1}
                    onChange={handleChange}
                    autoFocus={true}
                    required={true}
                  />
                </div>
                <div className="">
                  <p className="text-[15px] leading-[20px] font-medium">
                    {question[0].question2}
                  </p>
                  <input
                    className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]"
                    type="text"
                    name="question2"
                    value={credentials.question2}
                    onChange={handleChange}
                    required={true}
                  />
                </div>

                <div className="mt-[20px] bg-white rounded-[20px] h-[271px] px-[18px]">
                  <p className="mt-[11px] text-[15px] leading-[20px] font-medium">
                    Personal Information
                  </p>
                  <div className="flex flex-col gap-[15px]">
                    <input
                      className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  bg-[#EFEFEF]"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={credentials.name}
                      onChange={handleChange}
                      required={true}
                    />
                    <input
                      className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  bg-[#EFEFEF]"
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={credentials.phone}
                      onChange={handleChange}
                      required={true}
                      pattern="[6789][0-9]{9}"
                      title="Please enter valid phone number"
                    />
                    <input
                      className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  bg-[#EFEFEF]"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={credentials.email}
                      onChange={handleChange}
                      required={true}
                    />
                    <button className="rounded-[15px] h-[39px] text-[15px] leading-[20px] font-light w-full">
                      Submit
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-[18px]">
                <p className="text-[13px] leading-[20px] font-medium">
                  Terms and Conditions:
                </p>
                <p className="text-[13px] leading-[20px] font-light">
                  {parse(question && question[0].terms)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
