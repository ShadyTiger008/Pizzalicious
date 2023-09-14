import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { createOrder } from "../../lib/orderHandler";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../../store/store";
import { useRouter } from "next/router";

const OrderModal = ({ opened, setOpened, paymentMethod }) => {
  const [formData, setFormData] = useState({});
  const theme = useMantineTheme();
  const total = typeof window !== "undefined" && localStorage.getItem("total");
  const resetCart = useStore((state) => state.resetCart);
  const router = useRouter();

  const hadleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const id = await createOrder({ ...formData, total, paymentMethod });
    console.log("Order placed and id is: ", id);
    toast.success("Order placed successfully!");
    resetCart();
    {
      typeof window !== "undefined" && localStorage.setItem("order", id);
    }
    router.push(`/order/${id}`);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      <form onSubmit={handleSubmit} className="flex w-full flex-col space-y-6">
        <input
          type="text"
          placeholder="Your name"
          required
          name="name"
          className="rounded-md border-2 border-gray-400 p-2 outline-none"
          onChange={hadleInput}
        />
        <input
          type="text"
          placeholder="Your phone number"
          required
          name="phone"
          className="rounded-md border-2 border-gray-400 p-2 outline-none"
          onChange={hadleInput}
        />
        <textarea
          cols={8}
          rows={3}
          name="address"
          placeholder="You address here"
          className="rounded-md border-2 border-gray-400 p-2 outline-none"
          onChange={hadleInput}
        />
        <span>
          You will pay
          <span className="text-lg font-bold text-green-700">₹ {total}</span> on
          delivery!
        </span>
        <button
          type="submit"
          className="rounded-full border-2 border-themeRed/80 bg-themeRed/80 px-5 py-2 text-sm font-semibold text-white hover:bg-themeRed"
        >
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
};

export default OrderModal;
