import React from "react";

const Contact = () => {
  return (
    <div className="flex items-center justify-center py-10 ">
      <div className="w-[60%] ">
        <h1 className="text-3xl font-semibold">Contact Us</h1>
        <p className="pt-4">
          Would you like to know more about how our assistance can benefit you?
          Don't hesitate to reach out to us for further information.
        </p>
        <p className="pt-4">
          Contact us by email:{" "}
          <a
            className="text-blue-500 underline hover:text-blue-700"
            href="mailto:ibrahimdoba55@gmail.com"
          >
            ibrahimdoba55@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
