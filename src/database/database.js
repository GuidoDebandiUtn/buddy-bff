import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// export const sequelize = new Sequelize(
//     'buddy_database',
//     'postgres',
//     'root',
//     {
//         host: 'localhost',
//         dialect: 'postgres'
//     }
// )

export const sequelize = new Sequelize(
  process.env.DATABASE, //DATABASE
  process.env.USER, //USER
  process.env.PASSWORD, // PASSWORD
  {
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",
    timezone: "America/Argentina/Buenos_Aires",
  }
);
