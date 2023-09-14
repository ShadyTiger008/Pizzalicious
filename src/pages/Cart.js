import React, { useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import { urlFor } from "../../lib/client";
import { useStore } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";
import OrderModal from "../components/OrderModal";
import { useRouter } from "next/router";

const Cart = () => {
  const cartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [order, setOrder] = useState(
    typeof window !== "undefined" && localStorage.getItem("order"),
  );
  const router = useRouter();

  // Create a function to group pizzas by their unique properties (name, size, and price)
  const groupPizzas = (pizzas) => {
    const groupedPizzas = {};

    pizzas.forEach((pizza) => {
      const key = `${pizza.name}_${pizza.size}_${pizza.price}`;

      if (groupedPizzas[key]) {
        // If the pizza already exists, increase its quantity
        groupedPizzas[key].quantity += pizza.quantity;
        groupedPizzas[key].total += pizza.price * pizza.quantity;
      } else {
        // If it's a new pizza, add it to the groupedPizzas object
        groupedPizzas[key] = { ...pizza };
      }
    });

    return Object.values(groupedPizzas);
  };

  const uniquePizzas = groupPizzas(cartData.pizzas);

  const handleRemove = (index) => {
    removePizza(index);
    toast.error("Item Removed");
  };

  const total = () => {
    return cartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);
  };

  const handleCOD = () => {
    setPaymentMethod(0);
    typeof window !== "undefined" && localStorage.setItem("total", total());
  };

  const handleChekout = async () => {
    setPaymentMethod(1);
    typeof window !== "undefined" && localStorage.setItem("total", total());
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData.pizzas),
    });

    if (response.status === 500) return;

    const data = await response.json();
    toast.loading("Redirecting...");
    router.push(data.url);
  };

  return (
    <Layout>
      <main className="flex flex-row gap-[2rem] p-[2rem]">
        {/* Details Section */}
        <section className="w-[60%]">
          <table className="w-[100%] border-separate border-spacing-[1rem]">
            <thead>
              <tr>
                <th>Pizza</th>
                <th>Name</th>
                <th>Size</th>
                <th>Price(₹)</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {uniquePizzas.length > 0 &&
                uniquePizzas.map((pizza, index) => {
                  const src = urlFor(pizza.image).url();
                  return (
                    <tr key={index}>
                      <td className="flex items-center justify-center text-center">
                        <Image
                          loader={() => src}
                          src={src}
                          objectFit="cover"
                          width={85}
                          height={85}
                          alt=""
                          className="rounded-xl"
                        />
                      </td>
                      <td className="w-[25%] text-center">{pizza.name}</td>
                      <td className="text-center">
                        {pizza.size === 0
                          ? "Small"
                          : pizza.size === 1
                          ? "Medium"
                          : "Large"}
                      </td>
                      <td className="text-center"> {pizza.price}</td>
                      <td className="text-center">{pizza.quantity}</td>
                      <td className="text-center">
                        {pizza.quantity * pizza.price}
                      </td>
                      <td
                        onClick={() => handleRemove(index)}
                        className="cursor-pointer text-center text-xl font-semibold text-themeRed hover:scale-75"
                      >
                        X
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
        {/* Summary Section */}
        <section className="flex h-[16rem] w-[40%] flex-col items-start justify-between rounded-xl bg-white p-[1.6rem] shadow-xl">
          <span className=" w-full text-center text-xl font-bold">Cart</span>
          <div className="flex w-full flex-col space-y-6">
            <div className="flex flex-row justify-between">
              <span className="">Items</span>
              <span className="">{cartData.pizzas.length}</span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="">Total</span>
              <span className="">₹{total()}</span>
            </div>
          </div>

          {/* Payment buttons */}
          {!order && cartData.pizzas.length > 0 ? (
            <div className="flex w-full flex-row items-center justify-center space-x-4">
              <button
                onClick={handleCOD}
                className="rounded-full border-2 border-themeRed bg-white px-5 py-2 text-sm font-semibold text-themeRed hover:bg-themeRed hover:text-white"
              >
                Pay on Delivery
              </button>
              <button
                onClick={handleChekout}
                className="rounded-full border-2 border-themeRed/80 bg-themeRed/80 px-5 py-2 text-sm font-semibold text-white hover:bg-themeRed"
              >
                Pay Now
              </button>
            </div>
          ) : null}
        </section>
      </main>
      {/* Toaster for removing cart item */}
      <Toaster />
      {/* Modal for payment method */}
      <OrderModal
        opened={paymentMethod === 0}
        setOpened={setPaymentMethod}
        paymentMethod={paymentMethod}
      />
    </Layout>
  );
};

export default Cart;
