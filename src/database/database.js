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


let backgroundProcessLogShown = false;

export const sequelize = new Sequelize(
  process.env.DATABASE, //DATABASE
  process.env.USER, //USER
  process.env.PASSWORD, // PASSWORD
  {
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",
    timezone: "-03:00",
    logging: (msg) => {
      if (!msg.startsWith('Executing (default):')){
      //if (!msg.startsWith('Executing (default): SHOW INDEX') && !msg.startsWith('Executing (default): SELECT TABLE_NAME')) {
        console.log(msg);
      }
      if (!backgroundProcessLogShown) {
        console.log('Initializing Database processes...');
        backgroundProcessLogShown = true;
      }
    },
  },
  
);
