import Image from "next/image";
import React from "react";
import cherry from "../assets/Cherry.png";
import PizzaDelivery from "../assets/pizzaDelivery.png";
import HeroImage from '../assets/HeroImage.png';

const Hero = () => {
  return (
    <main className="flex flex-row px-[2rem] py-[1rem]">
      {/* Left Side */}
      <section className="flex flex-col space-y-4">
        <div className="bg-varPink mx-10 mt-[3rem] flex w-fit flex-row items-center space-x-2 rounded-full px-5 py-1">
          <span className="font-semibold text-themeRed">More than faster</span>
          <Image src={PizzaDelivery} alt="" width={40} height={25} />
        </div>
        <div className="mt-10 flex flex-col text-[4rem] font-semibold">
          <span>Savor the Speed</span>
          <span>
            of <span className="text-themeRed">Pizzalicious</span> Delivery
          </span>
          <span>Straight to Your Door!</span>
        </div>
        <div className="flex flex-col space-y-10">
          <p className="text-base font-semibold">
            Delight in Every Bite, Pizzalicious Delivers Right!
          </p>
          <button className="w-fit rounded-full bg-themeRed/75 px-5 py-2 text-white hover:bg-themeRed">
            Order Now
          </button>
        </div>
      </section>
      {/* Right Side */}
      <section className="relative">
        <div className="absolute w-[38rem] -top-[5rem] left-16">
          <Image src={HeroImage} alt="" layout="intrinsic" />
        </div>
      </section>
    </main>
  );
};

export default Hero;
