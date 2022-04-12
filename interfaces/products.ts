export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: "charros" | "escaramusas" | "charritos" | "unisex";

  //TODO agregar createdAt y updatedAt
  createdAt: string;
  updatedAt: string;
}

export type ISize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type IType = "botas" | "vestidos" | "camisa" | "sombreros";

// export type IColor =
//   | "piñon"
//   | "oro"
//   | "gris"
//   | "shedron"
//   | "negro"
//   | "miel"
//   | "hueso"
//   | "tortola"
//   | "café"
//   | "blanco";

// export type ISizesShoes = 18 | 19 | 20 | 21 | 22 | 23;
