import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CareerForm = () => {
  // eslint-disable-next-line
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    workType: "",
    sports: "",
    why: "",
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  const [resume, setResume] = useState("");
  const [work, setWork] = useState("");

  function uploadResume(e) {
    setResume(e.target.files[0]);
  }

  function uploadWork(e) {
    setWork(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", credentials.name);
    data.append("email", credentials.email);
    data.append("phone", credentials.phone);
    data.append("workType", credentials.workType);
    data.append("sports", credentials.sports);
    data.append("why", credentials.why);
    data.append("resume", resume);
    data.append("work", work);

    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}forms/career`, data)
      .then(() => navigate("/thank-you"))
      .catch((e) => console.error("error", e));
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-[90%] lg:w-[30%]">
        <p className="font-medium text-xl">Fill the Form</p>
        <form
          onSubmit={handleSubmit}
          className="mt-[10px] flex flex-col gap-[10px]"
        >
          <input
            className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px] focus:outline-none focus:border-none"
            type="text"
            placeholder="Name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            autoFocus={true}
            required={true}
          />
          <input
            className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  focus:outline-none focus:border-none"
            type="email"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            autoFocus={true}
            required={true}
          />
          <input
            className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  focus:outline-none focus:border-none"
            type="tel"
            placeholder="Phone"
            name="phone"
            value={credentials.phone}
            onChange={handleChange}
            autoFocus={true}
            required={true}
            pattern="[6789][0-9]{9}"
            title="Please enter valid phone number"
          />
          <select
            name="workType"
            autoFocus={true}
            required={true}
            onChange={handleChange}
            className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  focus:outline-none focus:border-none"
          >
            <option>Select...</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
          <input
            className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  focus:outline-none focus:border-none"
            type="text"
            placeholder="Sports"
            name="sports"
            value={credentials.sports}
            onChange={handleChange}
            autoFocus={true}
            required={true}
          />
          <div className="flex">
            <label htmlFor="">Upload Your Resume Here...</label>
            <input
              className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  focus:outline-none focus:border-none"
              type="file"
              onChange={(e) => uploadResume(e)}
              autoFocus={true}
              required={true}
            />
          </div>
          <div className="flex">
            <label htmlFor="">Upload Your Work Here...</label>
            <input
              className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  focus:outline-none focus:border-none"
              type="file"
              onChange={(e) => uploadWork(e)}
              autoFocus={true}
              required={true}
            />
          </div>
          <input
            className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  focus:outline-none focus:border-none"
            type="text"
            placeholder="Why Us ?"
            name="why"
            value={credentials.why}
            onChange={handleChange}
            autoFocus={true}
            required={true}
          />
          <button className="rounded-[15px] h-[39px] text-[15px] leading-[20px] font-light">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CareerForm;
