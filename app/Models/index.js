var User = require("./user.model.js");
var Leads = require("./leads.model.js");
var Project = require("./project.model.js");
var Inventory = require("./Inventory.model.js");
var land = require("./land.model.js");
var history = require("./history.model");
var attendance = require("./attendance.model");
var calllog = require("./calllog.model");
var installmentplan = require("./installmentplan.model");
var paymenthistory = require("./paymenthistory.model");
var property = require("./property.model");

const sequelize = require("./database");
const db = {};
db.sequelize = sequelize;

User.hasMany(User, { foreignKey: "updatedBy" }, { foreignKey: "createdBy" });

User.hasMany(
  Leads,
  { foreignKey: "assignAgent" },
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);
Leads.belongsTo(
  User,
  { foreignKey: "assignAgent" },
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);

User.hasMany(attendance, { foreignKey: "userid" });
attendance.belongsTo(User, { foreignKey: "userid" });

User.hasMany(calllog, { foreignKey: "createdBy" });
calllog.belongsTo(User, { foreignKey: "createdBy" });

User.hasMany(
  installmentplan,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);
installmentplan.belongsTo(
  User,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);

User.hasMany(
  paymenthistory,
  { foreignKey: "userid" },
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);
paymenthistory.hasOne(User, { foreignKey: "userid" });
paymenthistory.belongsTo(
  User,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);

User.hasMany(history, { foreignKey: "createdBy" });
history.belongsTo(User, { foreignKey: "createdBy" });

User.hasMany(
  Inventory,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);
Inventory.belongsTo(
  User,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);

User.hasMany(land, { foreignKey: "updatedBy" }, { foreignKey: "createdBy" });
land.belongsTo(User, { foreignKey: "updatedBy" }, { foreignKey: "createdBy" });

User.hasMany(Project, { foreignKey: "updatedBy" }, { foreignKey: "createdBy" });
Project.belongsTo(
  User,
  { foreignKey: "updatedBy" },
  { foreignKey: "createdBy" }
);

Leads.belongsTo(Project, { foreignKey: "projectid" });
Project.hasMany(Leads, { foreignKey: "projectid" });

land.hasMany(Leads, { foreignKey: "landid" });
Leads.belongsTo(land, { foreignKey: "landid" });

// Leads.belongsTo(property, { foreignKey: "property" });

Leads.hasMany(history, { foreignKey: "leadid" });
history.belongsTo(Leads, { foreignKey: "leadid" });

Leads.hasMany(calllog, { foreignKey: "leadid" });
calllog.belongsTo(Leads, { foreignKey: "leadid" });

Leads.hasMany(paymenthistory, { foreignKey: "leadid" });
paymenthistory.hasOne(Leads, { foreignKey: "leadid" });

property.hasMany(Leads, { foreignKey: "propertyid" });
Leads.belongsTo(property, { foreignKey: "propertyid" });

Inventory.hasMany(Leads, { foreignKey: "inventoryid" });
Leads.hasOne(Inventory, { foreignKey: "inventoryid" });

Inventory.hasMany(paymenthistory, { foreignKey: "inventoryid" });
paymenthistory.hasOne(Inventory, { foreignKey: "inventoryid" });

Project.hasMany(Inventory, { foreignKey: "projectid" });
Inventory.belongsTo(Project, { foreignKey: "projectid" });

land.hasMany(paymenthistory, { foreignKey: "landid" });
paymenthistory.hasOne(land, { foreignKey: "landid" });

installmentplan.hasMany(paymenthistory, { foreignKey: "installmentid" });
paymenthistory.hasOne(installmentplan, { foreignKey: "installmentid" });

Project.hasMany(paymenthistory, { foreignKey: "projectid" });
paymenthistory.hasOne(Project, { foreignKey: "projectid" });

Project.hasMany(history, { foreignKey: "ProjectIntrestId" });
history.belongsTo(Project, { foreignKey: "ProjectIntrestId" });

Project.hasMany(installmentplan, { foreignKey: "projectid" });
installmentplan.belongsTo(Project, { foreignKey: "projectid" });

db.users = User;
db.leads = Leads;
db.Project = Project;
db.Inventory = Inventory;
db.land = land;
db.history = history;
db.attendance = attendance;
db.calllog = calllog;
db.installmentplan = installmentplan;
db.paymenthistory = paymenthistory;
db.property = property;

module.exports = db;
