module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const multer = require("multer");
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  var upload = multer({ storage: storage })
  var router = require("express").Router();

  // router.post("/all", user.createAll);

  // Subcribtion of user with token
  // router.post("/subcribtion", user.subcribe);

  router.post("/login", upload.fields([]), user.login);

  router.post("/insertSalesAgent",upload.fields([]), user.insertSalesAgent);

  router.post("/viewSalesAgent",upload.fields([]), user.viewSalesAgent);

  router.post("/logout", upload.fields([]), user.logout);

  router.post("/editUser", upload.fields([]), user.editUser);

  router.post("/deleteUser", upload.fields([]), user.deleteUser);

  // // Retrieve all user or by type with token
  // router.get("/", user.findAll);

  // // Update a user with id and token
  // router.put("/update-password", user.updatePassword);

  // router.put("/forgot-password", user.emailPassword);

  // router.put("/update-pass", user.forgotPassword);

  // router.put("/resetApiKey", user.resetApiKey);

  // // Update a user with id and token
  // router.put("/update", user.update);

  // // / Retrieve a user with id and token
  // router.get("/:id", user.findOne);

  // // Delete a user with id and token
  // router.delete("/:id", user.delete);

  // router.get("/test", user.test);

  app.use("/pentagon/v1/user", router);
};
