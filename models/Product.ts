import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "../interfaces";

const productSchema = new Schema(
  {
    description: { type: String, required: true, default: "" },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
          message: "{VALUE} no es un tamaño válido.",
        },
      },
    ],
    // colors: [
    //   {
    //     type: String,
    //     enum: {
    //       values: [
    //         "piñon",
    //         "oro",
    //         "gris",
    //         "shedron",
    //         "negro",
    //         "miel",
    //         "hueso",
    //         "tortola",
    //         "café",
    //       ],
    //       message: "${VALUE} no es un color válido.",
    //     },
    //   },
    // ],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true, default: "" },
    type: {
      type: String,
      enum: {
        values: ["botas", "vestidos", "camisa", "sombreros"],
        message: "{VALUE} no es un tipo válido.",
      },
      default: "camisa",
    },
    gender: {
      type: String,
      enum: {
        values: ["charros", "escaramusas", "charritos", "unisex"],
        message: "{VALUE} no es un género válido.",
      },
      default: "unisex",
    },
  },
  {
    timestamps: true,
  }
);

//TODO Crear inidice de Mongo
//Esto me va a permir buscar por title y tags
productSchema.index({ title: "text", tags: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product || model("Product", productSchema);

export default Product;
