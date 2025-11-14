import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";

const seedProducts = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pedro8tp_db_user:projeto123@cluster0.259bxgw.mongodb.net/?appName=Cluster0"
    );
    await Product.deleteMany();
    console.log("Produtos deletados");
    await Product.insertMany(products);
    console.log("Produtos adicionados");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};
seedProducts();
