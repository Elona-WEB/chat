var express = require("express");
var router = express.Router();
const Joi = require("joi");
//Vamos con sequelize
const Message = require("../models/message");
const { wsConnection } = require("../wslib");

/* GET albums listing, si hacemos get, esta función resuelve */
router.get("/", function (req, res, next) {
  Message.findAll().then((result) => {
    res.send(result);
  });
});

/* GET albums listing, si hacemos get, esta función resuelve por id */
router.get("/:ts", function (req, res, next) {
  //SEQUELIZE
  Message.findByPk(req.params.ts).then((result) => {
    if (result == null) {
      res.status(404).send("El mensaje no existe");
    } else {
      res.send(result);
    }
  });
});

/*Vamos con el POST de album */

router.post("/", function (req, res, next) {
  //Validacion

  const vali = validateMessage(req.body);
  if (vali.error) {
    return res.status(400).send(vali.error.details[0].message);
  }

  //SQUELIZE
  const { message, author, ts } = req.body;
  Message.create({ message, author, ts })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err.errors[0].message);
    });
});

router.put("/:ts", function (req, res, next) {
  //Nos ayuda a ver los detalles de la validación, en caso de error, lanzamos mensaje
  const vali = validatePutMessage(req.body);
  if (vali.error) {
    return res.status(400).send(vali.error.details[0].message);
  }

  Message.update(req.body, { where: { ts: req.params.ts } }).then((result) => {
    if (result[0] == 0) {
      return res.status(404).send("Message not found");
    }
    res.send("Message updated!");
  });
});

//Vamos con el delete
router.delete("/:ts", function (req, res, next) {
  Message.destroy({ where: { ts: req.params.ts } }).then((result) => {
    if (result == 0) {
      return res.send("Message not found");
    }
    res.status(200).send("Message deleted!");
  });
});

//Funciones de validación
function validateMessage(msg) {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    //QUEDA PENDIENTE
    author: Joi.string().min(3).required(),
    ts: Joi.required(),
  });
  //Nos ayuda a ver los detalles de la validación, en caso de error, lanzamos mensaje
  return schema.validate(msg);
}

function validatePutMessage(msg) {
  const schema = Joi.object({
    message: Joi.string().min(5),
    //QUEDA PENDIENTE
    author: Joi.string().min(3),
  });
  //Nos ayuda a ver los detalles de la validación, en caso de error, lanzamos mensaje
  return schema.validate(msg);
}

module.exports = router;
