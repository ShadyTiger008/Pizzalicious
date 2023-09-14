import React, { useEffect } from "react";
import { client } from "../../../lib/client";
import Layout from "../../components/Layout";
import { RiBillLine } from "react-icons/ri";
import Cooking from "../../assets/cooking.png";
import Image from "next/image";
import OnWay from "../../assets/onway.png";
import Delivered from "../../assets/delivered.svg";
import Spinner from "../../assets/spinner.svg";

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type == 'order' && _id == '${params.id}']`;
  const order = await client.fetch(query);

  return {
    props: {
      order: order[0],
    },
  };
};

const Orders = ({ order }) => {
  console.log("Dynamic order page: ", order);

  useEffect(() => {
    if (order.status > 3) {
      localStorage.clear();
    }
  }, [order]);
  return (
    <Layout>
      <main className="mt-10 flex flex-col items-center justify-center gap-16 space-y-5">
        <h1 className="text-4xl font-bold">Order in process</h1>
        {/* Order Details */}
        <section className="flex flex-col space-y-8">
          <div className="flex w-[700px] flex-row justify-between text-lg">
            <span>Order ID</span>
            <span className="font-semibold">{order._id}</span>
          </div>
          <div className="flex w-[700px] flex-row justify-between text-lg">
            <span>Customer Name</span>
            <span className="font-semibold">{order.name}</span>
          </div>
          <div className="flex w-[700px] flex-row justify-between text-lg">
            <span>Phone</span>
            <span className="font-semibold">{order.phone}</span>
          </div>
          <div className="flex w-[700px] flex-row justify-between text-lg">
            <span>Method</span>
            <span className="font-semibold">
              {order.method === 0 ? "Cash on delivery" : "Online payment(paid)"}
            </span>
          </div>
          <div className="flex w-[700px] flex-row justify-between text-lg">
            <span>Total</span>
            <span className="font-semibold">₹ {order.total}</span>
          </div>
        </section>
        {/* Order status section */}
        <section className="flex w-full flex-row justify-between px-28">
          <div className="flex flex-col items-center space-y-10">
            <RiBillLine size={50} color="themeRed" fill="themeRed" />
            <span>Payment</span>
            <span>
              {order.method === 0 ? (
                <span className="w-fit rounded-full bg-orange-500 px-5 py-2 text-sm text-white">
                  On delivery
                </span>
              ) : (
                <span className="w-fit rounded-full bg-green-600 px-5 py-2 text-sm text-white">
                  Completed
                </span>
              )}
            </span>
          </div>
          <div className="flex flex-col items-center space-y-10">
            <Image src={Cooking} alt="" width={50} height={50} />
            <span>Cooking</span>
            {order.status === 1 && (
              <Image
                src={Spinner}
                alt=""
                className="relative -top-[11rem] w-[6rem]"
              />
            )}

            {order.status > 1 && (
              <span className="w-fit rounded-full bg-green-600 px-5 py-2 text-sm text-white">
                Completed
              </span>
            )}
          </div>
          <div className="flex flex-col items-center space-y-10">
            <Image src={OnWay} alt="" width={50} height={50} />

            <span>Out for delivery</span>
            {order.status === 2 && (
              <Image
                src={Spinner}
                alt=""
                className="relative -top-[11rem] w-[6rem]"
              />
            )}
            {order.status > 2 && (
              <span className="w-fit rounded-full bg-green-600 px-5 py-2 text-sm text-white">
                Completed
              </span>
            )}
          </div>
          <div className="flex flex-col items-center space-y-10">
            <Image
              src={Delivered}
              alt=""
              width={50}
              height={50}
              color="themeRed"
            />

            <span>Delivered</span>
            {order.status === 3 && (
              <Image
                src={Spinner}
                alt=""
                className="relative -top-[11rem] w-[6rem]"
              />
            )}
            {order.status > 3 && (
              <span className="w-fit rounded-full bg-green-600 px-5 py-2 text-sm text-white">
                Completed
              </span>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Orders;
