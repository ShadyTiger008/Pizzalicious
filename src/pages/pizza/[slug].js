import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { client, urlFor } from "../../../lib/client";
import Image from "next/image";
import LeftArrow from "../../assets/arrowLeft.png";
import RightArrow from "../../assets/arrowRight.png";
import p1 from "../../assets/p1.jpg";
import { recommendationData } from "../../MapData/recommendation";
import Link from "next/link";
import { useStore } from "../../../store/store";
import toast, { Toaster } from "react-hot-toast";

const Pizza = ({ pizza }) => {
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  // console.log(pizza);
  const src = urlFor(pizza.image).url();

  const handleQuantity = (type) => {
    type === "increment"
      ? setQuantity((previous) => previous + 1)
      : quantity === 1
      ? null
      : setQuantity((previous) => previous - 1);
  };

  const getRandomRecommendations = () => {
    const randomRecommendations = [];
    const dataCopy = [...recommendationData]; // Create a copy of the recommendationData array

    while (randomRecommendations.length < 3 && dataCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * dataCopy.length);
      randomRecommendations.push(dataCopy[randomIndex]);
      dataCopy.splice(randomIndex, 1);
    }

    return randomRecommendations;
  };

  const recommendation = getRandomRecommendations();

  const pizzaId = pizza._id;

  // Add to cart function
  const addPizza = useStore((state) => state.addPizza);
  const addToCart = () => {
    addPizza({
      ...pizza,
      price: pizza.price[size],
      quantity: quantity,
      size: size,
    });
    toast.success("Added to cart");
  };

  return (
    <Layout>
      <main className="mt-[1rem] flex flex-col space-y-20 p-[4rem]">
        {/* Image Section */}
        <div className="flex flex-row gap-[5rem]">
          <section className="relative h-[25rem] w-[40%] overflow-hidden rounded-3xl">
            <Image
              loader={() => src}
              src={src}
              alt=""
              layout="fill"
              unoptimized
              className="duration-300 hover:scale-110"
            />
          </section>
          {/* Details Section */}
          <section className="flex flex-col space-y-12">
            {/* Name and Details */}
            <div className="flex flex-col space-y-2">
              <span className="text-4xl font-semibold">{pizza.name}</span>
              <p className="text-2xl font-medium">{pizza.details}</p>
            </div>
            {/* Price Section */}
            <div className="text-3xl font-bold">
              <span className="text-themeRed">₹</span> {pizza.price[size]}
            </div>
            {/* Size Section */}
            <div className="flex flex-row items-center space-x-10">
              <span className="text-2xl font-bold">Size</span>
              <div className="flex flex-row space-x-4">
                <div
                  onClick={() => {
                    setSize(0);
                  }}
                  className={`cursor-pointer rounded-full border-2 border-themeRed px-5 py-2 text-sm font-semibold text-themeRed hover:bg-themeRed hover:text-white ${
                    size === 0 ? "bg-themeRed text-white" : ""
                  }`}
                >
                  Small
                </div>
                <div
                  onClick={() => {
                    setSize(1);
                  }}
                  className={`cursor-pointer rounded-full border-2 border-themeRed px-5 py-2 text-sm font-semibold text-themeRed hover:bg-themeRed hover:text-white ${
                    size === 1 ? "bg-themeRed text-white" : ""
                  }`}
                >
                  Medium
                </div>
                <div
                  onClick={() => {
                    setSize(2);
                  }}
                  className={`cursor-pointer rounded-full border-2 border-themeRed px-5 py-2 text-sm font-semibold text-themeRed hover:bg-themeRed hover:text-white ${
                    size === 2 ? "bg-themeRed text-white" : ""
                  }`}
                >
                  Large
                </div>
              </div>
            </div>
            {/* Qantity Section */}
            <div className="flex flex-row space-x-10  text-2xl">
              <h1 className="font-bold">Quantity</h1>
              <div className="flex flex-row space-x-4">
                <Image
                  src={LeftArrow}
                  height={20}
                  width={20}
                  alt=""
                  objectFit="contain"
                  onClick={() => handleQuantity("decrement")}
                />
                <span>{quantity}</span>
                <Image
                  src={RightArrow}
                  height={20}
                  width={20}
                  alt=""
                  objectFit="contain"
                  onClick={() => handleQuantity("increment")}
                />
              </div>
            </div>
            {/* Button Section */}
            <button
              onClick={addToCart}
              className="w-fit rounded-full bg-themeRed/80 px-5 py-2 text-sm text-white hover:bg-themeRed"
            >
              Add to Cart
            </button>
          </section>
        </div>
        {/* Recommendation Section */}
        <section className="flex flex-col space-y-10">
          <h1 className="text-3xl font-semibold">Recommended for you</h1>
          <div className="flex flex-row justify-center space-x-20">
            {recommendation.map((recommendationItem) => {
              return (
                <div
                  className="flex flex-col space-y-6"
                  key={recommendationItem.id} // Assign a unique key to each recommendation item
                >
                  <div className="relative h-[16rem] w-[22rem] overflow-hidden rounded-3xl">
                    {/* Pass the pizzaId as the id parameter in the link */}
                    <Link
                      href={`/pizza/${pizza.slug.current}?id=${pizzaId}`}
                      key={recommendationItem.id}
                    >
                      <Image
                        src={recommendationItem.imgSrc}
                        alt=""
                        objectFit="cover"
                        layout="fill"
                        className="cursor-pointer duration-300 hover:scale-110"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-1 px-2 text-xl font-bold">
                    <span>{recommendationItem.name}</span>
                    <span>
                      <span className="text-themeRed">₹</span>{" "}
                      {recommendationItem.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <Toaster />
      </main>
    </Layout>
  );
};

export default Pizza;

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type=="pizza" && defined(slug.current)][].slug.current`,
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug = "", id } = context.params;
  const pizza = await client.fetch(
    `*[_type=="pizza" && slug.current == '${slug}'][0]`,
  );
  return {
    props: {
      pizza,
    },
  };
}
