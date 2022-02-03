module.exports = (app) => {
    const project = require("../controllers/project.controller.js");
    const multer = require("multer");
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+""+file.originalname)
      }
    })
    
    var upload = multer({ storage: storage })
    var router = require("express").Router();
  
    router.post("/setProject", upload.any(), project.setProject);
  
    app.use("/pentagon/v1/project", router);
  };
  