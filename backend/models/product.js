import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Por favor, insira o nome do produto"],
      maxLength: [200, "O nome do produto não pode ter mais de 200 caracteres"],
    },
    price: {
      type: Number,
      require: [true, "Por favor, insira o preço do produto"],
      maxLength: [5, "O preço do produto não pode ter mais de 5 dígitos"],
    },
    description: {
      type: String,
      require: [true, "Por favor, insira a descrição do produto"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          require: true,
        },
        url: {
          type: String,
          require: true,
        },
      },
    ],
    category: {
      type: String,
      require: [true, "Por favor, insira a categoria do produto"],
      enum: {
        values: [
          "Eletrônicos",
          "Câmeras",
          "Notebooks",
          "Acessórios",
          "Headphones",
          "Alimentação",
          "Livros",
          "Sportes",
          "Jardim",
          "Casa",
        ],
        message: "Por favor, selecione a categoria do produto",
      },
    },
    seller: {
      type: String,
      require: [true, "Por favor, insira o nome do vendedor"],
    },
    stock: {
      type: Number,
      require: [true, "Por favor, insira o estoque do produto"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          require: true,
        },
        rating: {
          type: Number,
          require: true,
        },
        comment: {
          type: String,
          require: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
