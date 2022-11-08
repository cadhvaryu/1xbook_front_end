import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { CareerForm } from "../components";
import AffiliateForm from "../components/AffiliateForm";

const StaticPage = () => {
  const navigate = useNavigate();
  const [staticContent, setStaticContent] = useState("");
  const { slug } = useParams();

  if (slug === "quiz") {
    navigate("/quiz");
  }

  useEffect(() => {
    setStaticContent("");
    const getStaticData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}pages/getPages?data=${slug}`
      )
        .then((res) => res.json())
        .then((data) => setStaticContent(data[0]));
    };
    getStaticData();
  }, [slug]);

  return (
    <>
      {staticContent && (
        <div className="mx-[18px] lg:mx-[37px] 2xl:mx-[150px] min-h-[80vh]">
          <img
            src={staticContent && staticContent.image}
            className="rounded-md max-h-[50vh] w-full block object-cover object-top mt-5"
            alt="Banner Here"
          />
          <p className="text-xl font-medium my-5">
            {staticContent && staticContent.title}
          </p>
          {parse(staticContent && staticContent.content)}
        </div>
      )}

      {slug.includes("contact") && <ContactForm />}
      {slug.includes("career") && <CareerForm />}
      {slug.includes("affiliate") && <AffiliateForm />}
    </>
  );
};

export default StaticPage;
