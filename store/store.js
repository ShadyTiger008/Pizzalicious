import create from "zustand";

export const useStore = create((set) => ({
  // Cart
  cart: {
    pizzas: [],
  },

  // Remove Pizza
  removePizza: (indexToRemove) =>
    set((state) => ({
      cart: {
        pizzas: state.cart.pizzas.filter((_, index) => index !== indexToRemove),
      },
    })),

  //Reset Cart
  resetCart: () => {
    set(() => ({
      cart: {
        pizzas: [],
      },
    }));
  },

  // Add pizza to cart
  addPizza: (data) =>
    set((state) => ({
      cart: {
        pizzas: [...state.cart.pizzas, data],
      },
    })),
}));
