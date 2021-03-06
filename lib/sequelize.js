const { Sequelize } = require("sequelize");

//Definimos conexión
const sequelize = new Sequelize("database", "", "", {
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});

//Para conectar, usamos este. es una promesa.
//Nos construye el archivo de la db
sequelize.authenticate().then(() => {
  console.log("Autenticados!");
});

module.exports = sequelize;
