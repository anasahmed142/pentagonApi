var User = require("./user.model.js");
var Leads = require("./leads.model.js");
var Project = require("./project.model.js");
var Inventory = require("./inventory.model.js");
var lands = require("./land.model.js");

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

db.users = User;
db.leads = Leads;
db.project = Project;
db.inventory = Inventory;
db.land = lands;

module.exports = db;
