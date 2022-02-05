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
      var fieldname = element.fieldname;
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
        file4: JSON.stringify(file4),
        otherFiles: JSON.stringify(otherFiles),
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

exports.getProjects = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const dat = parseData.dat;
    var token = parseData.token;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }
    const project = await projects.findAll().catch((err) => {
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
    var dats = JSON.parse(JSON.stringify(project, null, 2));
    var datas = { projects: dats };
    var send = {
      version: "v1",
      rCode: 100,
      results: datas,
    };
    res.send(send);
  } catch (err) {
    console.log("2:", err);
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

exports.getProject = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const projectid = parseData.projectid;
    const dat = parseData.dat;
    var token = parseData.token;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }
    const project = await projects
      .findOne({
        where: {
          projectid: projectid,
        },
        include: [
          {
            model: inventorys,
          },
        ],
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
    var datas = { project };
    var send = {
      version: "v1",
      rCode: 100,
      results: datas,
    };
    res.send(send);
  } catch (err) {
    console.log("2:", err);
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

exports.deleteProject = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const projectid = parseData.projectid;
    var token = parseData.token;
    var dat = parseData.dat;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    const project = await projects
      .findOne({
        where: {
          projectid: projectid,
        },
        include: [
          {
            model: inventorys,
          },
        ],
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

    for (
      let index = 0;
      index < project.dataValues.inventories.length;
      index++
    ) {
      const element = project.dataValues.inventories[index];
      await inventorys.destroy({
        where: {
          inventoryid: element.dataValues.inventoryid,
        },
      });
    }

    await projects
      .destroy({
        where: {
          projectid: projectid,
        },
      })
      .catch((err) => {
        var senda = {
          version: "v1",
          rCode: 104,
          results: { error: err.errors[0].message },
        };
        e = "";
        ec = 104;
        res.send(senda);
      });

    var datas = { message: "successfully deleted the project" };
    var send = {
      version: "v1",
      rCode: 100,
      results: datas,
    };
    res.send(send);
  } catch (err) {
    console.log(err);
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

exports.editProject = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const projectid = parseData.projectid;
    const Type = parseData.Type;
    const address = parseData.address;
    const description = parseData.description;
    const field = parseData.field;
    const file1 = parseData.file1;
    const file2 = parseData.file2;
    const file3 = parseData.file3;
    const file4 = parseData.file4;
    const installMonths = parseData.installMonths;
    const marker = parseData.marker;
    const name = parseData.name;
    const otherFiles = parseData.otherFiles;
    const updatedBy = parseData.updatedBy;
    const dat = parseData.dat;
    var token = parseData.token;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }
    await projects
      .update(
        {
          Type,
          address,
          description,
          field,
          file1,
          file2,
          file3,
          file4,
          installMonths,
          marker,
          name,
          otherFiles,
          updatedBy,
        },
        {
          where: {
            projectid: projectid,
          },
        }
      )
      .catch((err) => {
        var senda = {
          version: "v1",
          rCode: 104,
          results: { error: err.errors[0].message },
        };
        e = "";
        ec = 104;
        res.send(senda);
      });

    var datas = { message: "successfully edited Project" };
    var send = {
      version: "v1",
      rCode: 100,
      results: datas,
    };
    res.send(send);
  } catch (err) {
    console.log("2:", err);
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

exports.deleteInventory = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const inventoryid = parseData.inventoryid;
    var token = parseData.token;
    var dat = parseData.dat;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    await inventorys
      .destroy({
        where: {
          inventoryid: inventoryid,
        },
      })
      .catch((err) => {
        var senda = {
          version: "v1",
          rCode: 104,
          results: { error: err.errors[0].message },
        };
        e = "";
        ec = 104;
        res.send(senda);
      });

    var datas = { message: "successfully deleted the inventory" };
    var send = {
      version: "v1",
      rCode: 100,
      results: datas,
    };
    res.send(send);
  } catch (err) {
    console.log(err);
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

exports.editInventory = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const inventoryid = parseData.inventoryid;
    const features = parseData.features;
    const name = parseData.name;
    const paymentType = parseData.paymentType;
    const roadSize = parseData.roadSize;
    const size = parseData.size;
    const ttype = parseData.ttype;
    const type = parseData.type;
    const updatedBy = parseData.updatedBy;
    const payment = parseData.payment;
    const dat = parseData.dat;
    var token = parseData.token;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }
    await inventorys
      .update(
        {
          features,
          name,
          payment,
          paymentType,
          roadSize,
          size,
          ttype,
          type,
          updatedBy,
        },
        {
          where: {
            inventoryid: inventoryid,
          },
        }
      )
      .catch((err) => {
        var senda = {
          version: "v1",
          rCode: 104,
          results: { error: err.errors[0].message },
        };
        e = "";
        ec = 104;
        res.send(senda);
      });

    var datas = { message: "successfully edited Inventory" };
    var send = {
      version: "v1",
      rCode: 100,
      results: datas,
    };
    res.send(send);
  } catch (err) {
    console.log("2:", err);
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

    .then(function (inventory) {
      console.log(inventory);
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
}
