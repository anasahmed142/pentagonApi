module.exports = (app) => {
    const land = require("../controllers/land.controller.js");
    const multer = require("multer");
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads");
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "" + file.originalname);
      },
    });
  
    var upload = multer({ storage: storage });
    var router = require("express").Router();
  
    router.post("/setLand", upload.any(), land.setLand);
  
    router.post("/getLands", upload.fields([]), land.getLands);
  
    router.post("/getLand", upload.fields([]), land.getLand);
  
    router.post("/deleteLand", upload.fields([]), land.deleteLand);
  
    router.post("/editLand", upload.fields([]), land.editLand);
  
    router.post("/makeLandDeal", upload.fields([]), land.makeLandDeal);
  
    app.use("/pentagon/v1/land", router);
  };
  