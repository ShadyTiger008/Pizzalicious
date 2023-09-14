import React from "react";
import { followLinks, footerData, footerLinks } from "../MapData/footerData";

import { BsFillSendFill } from "react-icons/bs";

const Footer = () => {
  return (
    <main id="footer" className="flex w-full flex-col space-y-6 p-5 mt-10 -z-10">
      {/* Findus, Callus, Mailus section */}
      <section className="flex flex-row justify-between px-3">
        {footerData.map((data) => {
          const { id, title, description, iconSrc } = data;
          return (
            <div key={id} className="flex flex-row items-center space-x-4">
              {iconSrc}
              <div>
                <span className="text-2xl font-bold text-themeRed">{title}</span>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </section>
      {/* Logo, Usefull Links and subscribe section */}
      <section className="flex flex-row justify-between px-10 pt-3">
        {/* Logo and slogan section */}
        <div className="flex flex-col space-y-2">
          <span className="text-6xl text-themeRed">Pizzalicious</span>
          <p>"Delight in Every Bite, Pizzalicious Delivers Right!"</p>
        </div>
        {/* Usefull links section */}
        <div className="mr-80 flex flex-col space-y-2">
          <span className="text-2xl font-semibold text-themeRed">Usefull Links</span>
          <ul className="flex flex-col space-y-2">
            {footerLinks.map((link) => {
              const { id, name, path } = link;
              return (
                <li
                  key={id}
                  className="hover:text-themeRed cursor-pointer font-medium"
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {/* Follow us and subscribe section */}
      <section className="flex flex-row justify-between px-5">
        {/* Follow us */}
        <div className="flex flex-col space-y-2">
          <span className="text-themeRed text-2xl font-semibold">
            Follow Us
          </span>
          <div className="flex flex-row space-x-2">
            {followLinks.map((follow) => {
              const { id, iconSrc, path } = follow;
              return <div key={id}>{iconSrc}</div>;
            })}
          </div>
        </div>
        {/* subscribe */}
        <div className="flex flex-col space-y-4">
          <span className="text-themeRed text-2xl font-semibold underline underline-offset-8 underline-themeRed">
            Subscribe
          </span>
          <div className="flex flex-row items-center bg-white border border-themeRed/20">
            <input
              type="email"
              placeholder="Enter your email"
              className=" px-3 outline-none"
            />
            <button className="bg-themeRed px-2 py-2">
              <BsFillSendFill size={22} color="white" />
            </button>
          </div>
        </div>
      </section>
      {/* copyright section */}
      <section className="text-center text-themeRed">
        Copyright &copy; 2023. All copyright reserved @pizzalicious
      </section>
    </main>
  );
};

export default Footer;
