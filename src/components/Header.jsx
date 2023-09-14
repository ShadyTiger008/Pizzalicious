import React, { useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { headerLinks } from "../MapData/headerData";
import { useStore } from "../../store/store";
import Link from "next/link";
import { IoReceiptOutline } from "react-icons/io5";

const Header = () => {
  const state = useStore((state) => state);
  const [order, setOrder] = useState("");
  useEffect(() => {
    setOrder(localStorage.getItem("order"));
  }, []);
  // console.log('From header console',state);
  const items = useStore((state) => state.cart.pizzas.length);
  return (
    <main className="relative z-50 flex flex-row items-center justify-between px-3 py-2">
      {/* Page Logo section  */}
      <section className="w-5 text-3xl font-semibold text-themeRed">
        Pizzalicios
      </section>
      {/* Header links section */}
      <section>
        <ul className="flex flex-row space-x-10">
          {headerLinks.map((link) => {
            const { id, name, path } = link;
            return (
              <Link href={path}>
                <li
                  key={id}
                  className="cursor-pointer font-medium hover:text-themeRed"
                >
                  {name}
                </li>
              </Link>
            );
          })}
        </ul>
      </section>
      {/* Cart section */}
      <section className="flex flex-row items-center justify-center gap-6 p-2">
        <Link href={"/Cart"}>
          <GiShoppingCart size={40} />
        </Link>
        {items > 0 && (
          <div
            className={`absolute right-2 top-3 ${
              order !== "" && "right-18"
            } z-20 flex h-5 w-5 items-center justify-center rounded-full bg-themeRed text-xs font-semibold text-white`}
          >
            {items}
          </div>
        )}
        {order && (
          <Link href={`/order/${order}`}>
            <IoReceiptOutline size={30} />
            {order !== "" && (
              <div className="absolute right-1 top-3 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-themeRed text-xs font-semibold text-white">
                1
              </div>
            )}
          </Link>
        )}
      </section>
    </main>
  );
};

export default Header;
