module.exports = (app) => {
  const project = require("../controllers/project.controller.js");
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

  router.post("/setProject", upload.any(), project.setProject);

  router.post("/getProjects", upload.fields([]), project.getProjects);

  router.post("/getProject", upload.fields([]), project.getProject);

  router.post("/deleteProject", upload.fields([]), project.deleteProject);

  router.post("/editProject", upload.fields([]), project.editProject);

  app.use("/pentagon/v1/project", router);
};
