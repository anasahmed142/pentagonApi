var User = require("./user.model.js");
var Leads = require("./leads.model.js");
var Project = require("./project.model.js");
var Inventory = require("./inventory.model.js");
var lands = require("./land.model.js");
var historys = require("./history.model");

const sequelize = require("./database");
const db = {};
db.sequelize = sequelize;

User.hasMany(Leads, { foreignKey: "name" });
Leads.belongsTo(User, { foreignKey: "assignAgent" }, Project, {
  foreignKey: "project",
});
Project.belongsTo(Leads, { foreignKey: "projectid" });

Project.hasMany(Inventory,{ foreignKey: "project"});
// Leads.hasOne(Project,{foreignKey: 'project'});
historys.hasOne(Leads, { foreignKey: "leadId"}, Project ,{foreignKey: "ProjectIntrestId"})

db.users = User;
db.leads = Leads;
db.project = Project;
db.inventory = Inventory;
db.land = lands;
db.history = historys;

module.exports = db;
