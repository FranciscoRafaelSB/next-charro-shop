import { CartState } from "./";
import { ICartProduct, ShippingAddress } from "../../interfaces";

type CarActionType =
  | {
      type: "[Cart] - Load cart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] - Update products in cart";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] -Chance product quantity";
      payload: ICartProduct;
    }
  | {
      type: "[Cart] - Remove product in cart";
      payload: ICartProduct;
    }
  | {
      type: "[Cart] - Load Address from cookies";
      payload: ShippingAddress;
    }
  | {
      type: "[Cart] - Update Address";
      payload: ShippingAddress;
    }
  | {
      type: "[Cart] - Update order summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | {
      type: "[Cart] - Order completed";
    };

export const cartReducer = (
  state: CartState,
  action: CarActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - Load cart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "[Cart] - Update products in cart":
      return {
        ...state,
        //Solucion 1
        // cart: [...state.cart, action.payload],

        // Solucion 2
        cart: [...action.payload],
      };
    case "[Cart] -Chance product quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          // product.quantity = action.payload.quantity
          return action.payload; //Este es producto ya actualizo con la cantidad actualizada
        }),
      };

    case "[Cart] - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product.size === action.payload.size &&
              product._id == action.payload._id
            )
        ),
      };
    case "[Cart] - Update Address":
    case "[Cart] - Load Address from cookies":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "[Cart] - Update order summary":
      return {
        ...state,
        ...action.payload,
      };

    case "[Cart] - Order completed":
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      };

    default:
      return state;
  }
};
