import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const QuizAll = () => {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const getStaticData = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}quiz/questions`)
        .then((res) => res.json())
        .then((data) => setQuestion(data));
    };
    getStaticData();
  }, []);
  console.log(question);

  return (
    <>
      <div className="mx-[18px] lg:mx-[37px] 2xl:mx-[150px]">
        <p className="text-center my-5 text-[20px] font-medium">
          Available Quiz
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {question.map((item, index) => {
            return (
              <Link to={`/quiz/${item.slug}`}>
                <div className="bg-white rounded-[20px] grid grid-flow-col lg:grid-flow-row">
                  <img src={item.image} className="w-full" alt="" />
                  <div className="p-5">
                    <p>{item.title}</p>
                    <p>{parse(item.desc)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default QuizAll;
