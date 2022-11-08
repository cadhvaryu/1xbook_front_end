import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: credentials.name,
      email: credentials.email,
      phone: credentials.phone,
      subject: credentials.subject,
      message: credentials.message,
    };
    await fetch(`${process.env.REACT_APP_API_BASE_URL}forms/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(navigate("/thank-you"));
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
          <input
            className="w-full h-[39px] rounded-[15px] mt-[8px] px-[15px]  focus:outline-none focus:border-none"
            type="text"
            placeholder="Subject"
            name="subject"
            value={credentials.subject}
            onChange={handleChange}
            autoFocus={true}
            required={true}
          />
          <textarea
            rows="5"
            placeholder="Message"
            name="message"
            value={credentials.message}
            onChange={handleChange}
            autoFocus={true}
            required={true}
            className="w-full rounded-[15px] mt-[8px] p-[15px] focus:outline-none focus:border-none"
          />
          <button className="rounded-[15px] h-[39px] text-[15px] leading-[20px] font-light">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
