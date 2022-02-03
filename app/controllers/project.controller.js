const db = require("../Models");
const projects = db.project;
const inventorys = db.inventory;
// const token = db.token;
const { genrateApi, decodeApi, getDateUNIX } = require("../util/validators");

var e = "";
var ec = 104;

exports.setProject = async (req, res) => {
  try {
    const data = req.body.data;
    const files = req.files;
    var file1 = "";
    var file2 = "";
    var file3 = "";
    var file4 = [];
    var otherFiles = [];

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      const name =
        "https://conceptdigitizing.com/api/uploads/" + element.filename;
      const fieldname = element.fieldname;
      if (
        fieldname !== "file0" &&
        fieldname !== "file1" &&
        fieldname !== "file2"
      ) {
        var sp = fieldname.split("%");
        fieldname = "" + sp[0];
      }
      switch (fieldname) {
        case "file0":
          file1 = name;
          break;
        case "file1":
          file2 = name;
          break;
        case "file2":
          file3 = name;
          break;
        case "file3":
          file4.push(name);
          break;
        case "file":
          otherFiles.push(name);
          break;
      }
    }
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const dat = parseData.dat;
    var token = parseData.token;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }
    projects
      .create({
        name: parseData.name,
        address: parseData.address,
        description: parseData.description,
        Type: parseData.Type,
        field: parseData.field,
        marker: parseData.marker,
        installMonths: parseData.installMonths,
        createdBy: parseData.createdBy,
        updatedBy: parseData.updatedBy,
        file1: file1,
        file2: file2,
        file3: file3,
        file4: file4,
        otherFiles: otherFiles,
      })
      .then(function (project) {
        if (project) {
          for (let index = 0; index < parseData.inventory.length; index++) {
            const element = parseData.inventory[index];
            insertInventory(element, res, project.dataValues.projectid);
            if (parseData.inventory.length - 1 === index) {
              var send = {
                version: "v1",
                rCode: 100,
                results: { projectid: project.dataValues.projectid },
              };
              e = "";
              ec = 104;
              res.send(send);
            }
          }
        } else {
          var send = {
            version: "v1",
            rCode: 104,
            results: { error: "Error in insert new record" },
          };
          e = "";
          ec = 104;
          res.send(send);
        }
      })
      .catch((err) => {
        console.log(err);
        var senda = {
          version: "v1",
          rCode: 104,
          results: { error: err.errors[0].message },
        };
        e = "";
        ec = 104;
        res.send(senda);
      });
  } catch (err) {
    var dataa = { error: e };
    var senda = {
      version: "v1",
      rCode: ec,
      results: dataa,
    };
    e = "";
    ec = 104;
    res.send(senda);
  }
};

function insertInventory(parseData, res, projectid) {
  inventorys
    .create({
      name: parseData.name,
      paymentType: parseData.paymentType,
      features: parseData.features,
      payment: Number(parseData.payment),
      roadSize: Number(parseData.roadSize),
      size: Number(parseData.size),
      ttype: parseData.ttype,
      type: parseData.type,
      updatedBy: parseData.updatedBy,
      createdBy: parseData.createdBy,
      project: projectid,
    })
    .then(function (inventory) {})
    .catch((err) => {
      console.log(err);
      var senda = {
        version: "v1",
        rCode: 104,
        results: { error: err.errors[0].message },
      };
      e = "";
      ec = 104;
      res.send(senda);
    });
}
