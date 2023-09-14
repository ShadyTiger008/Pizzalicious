import React from "react";
import {servicesData} from "../MapData/servicesData";
import Image from "next/image";

const Services = () => {
  return (
    <main className="mt-10 flex flex-col items-center justify-center space-y-14">
      {/* Heading Section */}
      <section className="flex flex-col items-center justify-center space-y-2">
        <span className="text-3xl font-semibold">
          Discover Our Delicious Offerings
        </span>
        <span className="text-xl font-bold text-themeRed">
          Your Beloved Tastes
        </span>
        <span className="text-3xl font-semibold">Delivered Right to You</span>
      </section>
      {/* Description section */}
      <section className="flex flex-row items-center justify-center space-x-16 px-20">
              { servicesData.map((services) => {
                  const { id, title, description, imgSrc } = services
                  return (
                    <div
                      key={id}
                      className="flex flex-col items-center justify-center space-y-8"
                    >
                      <div className="h-[10rem] w-[10rem]">
                        <Image src={imgSrc} alt="" className="" />
                      </div>
                      <div className="flex flex-col space-y-3 justify-center items-center">
                        <span className="font-bold text-themeRed text-2xl">{title}</span>
                        <p className="text-center w-96 text-base font-medium text-gray-500">{description}</p>
                      </div>
                    </div>
                  );
        })}
        
      </section>
    </main>
  );
};

export default Services;
