const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Message extends Model {}

Message.init(
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ts: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    //Establecemos la conexión a la base
    sequelize,
    //Nombre de la tabla
    modelName: "Message",
    timestamps: false,
  }
);

Message.sync();

module.exports = Message;
