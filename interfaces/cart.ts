import { ISize } from "./";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: ISize;
  inStock: number;
  // color: IColor;
  slug: string;
  title: string;
  gender: "charros" | "escaramusas" | "charritos" | "unisex";

  quantity: number;
  // description: string;
  // inStock: number;
  // tags: string[];
  // type: IType;

  //TODO agregar createdAt y updatedAt
  // createdAt: string;
  // updatedAt: string;
}
