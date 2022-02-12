module.exports = (app) => {
    const property = require("../controllers/property.controller.js");
    const multer = require("multer");
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads");
      },
      filename: function (req, file, cb) {
        var fieldname = file.fieldname;
        if (
          fieldname !== "file0" &&
          fieldname !== "file1" &&
          fieldname !== "file2"
        ) {
          var sp = fieldname.split("%");
          fieldname = "" + sp[0];
        }
        cb(null, fieldname + "-" + Date.now() + "" + file.originalname);
      },
    });
  
    var upload = multer({ storage: storage });
    var router = require("express").Router();
  
    router.post("/getPropertys", upload.fields([]), property.getPropertys);;
  
    app.use("/pentagon/v1/property", router);
  };
  