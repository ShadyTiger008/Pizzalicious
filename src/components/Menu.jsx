import { urlFor } from "lib/client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { recommendationData } from "../MapData/recommendation";

const Menu = ({ pizzas }) => {
  // console.log(pizzas);
  return (
    <main id="menu" className="mt-16 flex flex-col space-y-10 px-20">
      {/* Heading Section */}
      <section className="flex flex-col space-y-6">
        <span className="text-xl font-semibold text-themeRed">
          Our Irresistible Menu
        </span>
        <div className="flex flex-col space-y-2 text-3xl font-semibold">
          <span>That Will Forever Capture</span>
          <span>Your Heart</span>
        </div>
      </section>
      {/* Menu Section */}
      <section className="flex flex-row flex-wrap justify-center gap-20">
        {pizzas.map((pizza, id) => {
          console.log(pizza);
          const src = urlFor(pizza.image).url();
          return (
            <div className="flex flex-col space-y-6">
              <Link href={`./pizza/${pizza.slug.current}`}>
                <div className="relative h-[16rem] w-[22rem] overflow-hidden rounded-3xl">
                  <Image
                    loader={() => src}
                    src={src}
                    alt=""
                    objectFit="cover"
                    layout="fill"
                    className="cursor-pointer duration-300 hover:scale-110"
                  />
                </div>
              </Link>
              <div className="flex flex-col space-y-1 px-2 text-xl font-bold">
                <span>{pizza.name}</span>
                <span>
                  <span className="text-themeRed">₹</span> {pizza.price[1]}
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Menu;
