module.exports = (app) => {
  const leads = require("../controllers/leads.controller.js");
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

  // router.post("/all", user.createAll);

  // Subcribtion of user with token
  // router.post("/subcribtion", user.subcribe);

  router.post("/setLead", upload.fields([]), leads.setLead);

  router.post("/getLeads", upload.fields([]), leads.getLeads);

  router.post("/setLeads", upload.single('file'), leads.setLeads);

  router.post("/assignLeadToAgent", upload.fields([]), leads.assignLeadToAgent);

  router.post("/editLead", upload.fields([]), leads.editLead);

  router.post("/deleteLead", upload.fields([]), leads.deleteLead);

  router.post("/deleteLeads", upload.fields([]), leads.deleteLeads);

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

  app.use("/pentagon/v1/leads", router);
};
