var User = require("./user.model.js");
var Leads = require("./leads.model.js");
var Project = require("./project.model.js");
var Inventory = require("./inventory.model.js");
var lands = require("./land.model.js");
var historys = require("./history.model");
var attendance = require("./attendance.model");
var calllog = require("./calllog.model");
var installmentplan = require("./installmentplan.model");
var paymenthistory = require("./paymenthistory.model");
var property = require("./property.model");

const sequelize = require("./database");
const inventory = require("./inventory.model.js");
const land = require("./land.model.js");
const db = {};
db.sequelize = sequelize;

User.hasMany(
  Leads,
  { foreignKey: "assignAgent" },
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" },
  User,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" },
  attendance,
  { foreignKey: "userid" },
  calllog,
  { foreignKey: "createdBy" },
  installmentplan,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" },
  paymenthistory,
  { foreignKey: "userid" },
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" },
  historys,
  { foreignKey: "createdBy" },
  Inventory,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" },
  lands,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" },
  Project,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);

Leads.belongsTo(
  User,
  { foreignKey: "assignAgent" },
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" },
  Project,
  { foreignKey: "project" },
  inventory,
  { foreignKey: "inventory" },
  land,
  { foreignKey: "land" },
  property,
  { foreignKey: "property" }
);

Leads.hasMany(
  historys,
  { foreignKey: "leadId" },
  calllog,
  { foreignKey: "leadId" },
  paymenthistory,
  { foreignKey: "leadId" }
);

Project.belongsTo(
  User,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);

Project.hasMany(
  Inventory,
  { foreignKey: "project" },
  paymenthistory,
  { foreignKey: "projectid" },
  historys,
  { foreignKey: "ProjectIntrestId" },
  Leads,
  { foreignKey: "project" },
  installmentplan,
  { foreignKey: "projectid" }
);

historys.belongsTo(
  User,
  { foreignKey: "createdBy" },
  Leads,
  { foreignKey: "leadid" },
  Project,
  { foreignKey: "ProjectIntrestId" }
);

inventory.belongsTo(
  User,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" },
  Project,
  { foreignKey: "project" }
);

inventory.hasMany(Leads, { foreignKey: "inventory" }, paymenthistory, {
  foreignKey: "inventoryid ",
});

lands.belongsTo(User, { foreignKey: "updatedBy" }, { foreignKey: "createdBy" });

lands.hasMany(paymenthistory, { foreignKey: "landid" }, Leads, {
  foreignKey: "land",
});

attendance.belongsTo(User, { foreignKey: "userid" });

calllog.belongsTo(Leads, { foreignKey: "leadId" }, User, {
  foreignKey: "createdBy",
});

installmentplan.belongsTo(
  User,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" },
  Project,
  { foreignKey: "projectid" }
);

installmentplan.hasMany(paymenthistory, { foreignKey: "installmentid" });

paymenthistory.belongsTo(
  User,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);

paymenthistory.hasOne(
  installmentplan,
  { foreignKey: "installmentid" },
  lands,
  { foreignKey: "landid" },
  Project,
  { foreignKey: "projectid" },
  inventory,
  { foreignKey: "inventoryid " },
  Leads,
  { foreignKey: "leadId" },
  User,
  { foreignKey: "userid" }
);

db.users = User;
db.leads = Leads;
db.project = Project;
db.inventory = Inventory;
db.land = lands;
db.history = historys;
db.attendance = attendance;
db.calllog = calllog;
db.installmentplan = installmentplan;
db.paymenthistory = paymenthistory;

module.exports = db;
