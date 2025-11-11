import mongoose from "mongoose";

export const connectDatabse  = () => {
    let DB_URI = process.env.DB_URI;

    mongoose.connect(DB_URI).then((con) => {
        console.log(`Conectado ao banco de dados MongoDB com o HOST: ${con.connection?.host}`);
    }).catch((err) => {
        console.log(`Erro ao conectar ao banco de dados MongoDB: ${err}`);
    });
}