const db = require("../Models");
const leads = db.leads;
const user = db.users;
const history = db.history;
const Project = db.Project;
const calllog = db.calllog;
const property = db.property;
const land = db.land;
const Inventory = db.Inventory;
// const token = db.token;
const fs = require("fs");
const { genrateApi, decodeApi, getDateUNIX } = require("../util/validators");

var e = "";
var ec = 104;
var nooooo = 1;
var result = [];
var pathsss = "";

exports.setLead = async (req, res) => {
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
    leads
      .create({
        phoneNo: parseData.phoneNo,
        name: parseData.name,
        emailId: parseData.emailId,
        updatedBy: parseData.updatedBy,
        createdBy: parseData.createdBy,
      })
      .then(function (lead) {
        if (lead) {
          var send = {
            version: "v1",
            rCode: 100,
            results: { leadId: lead.dataValues.leadId },
          };
          e = "";
          ec = 104;
          res.send(send);
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

exports.setLeads = async (req, res) => {
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

    try {
      var f = req.file;
      var csv = fs.readFileSync(f.path);
      pathsss = f.path;
      var lines = csv.toString().split("\n");

      try {
        uploadLead(parseData, lines, res);
      } catch (error) {
        console.log("error", error);
      }
    } catch (result) {
      console.log("result", result);
    }
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

exports.assignLeadToAgent = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    var leadId = parseData.leadId;
    var status = parseData.status;
    var assignAgent = parseData.assignAgent;
    var time = parseData.time;
    var token = parseData.token;
    var dat = parseData.dat;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    await leads
      .update(
        { status, assignAgent, time },
        {
          where: {
            leadId: leadId,
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

    var datas = { message: "successfully assigned" };
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

exports.getLeads = async (req, res) => {
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
    const lead = await leads
      .findAll({
        include: [
          {
            model: user,
            attributes: ["name"],
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
    var dats = JSON.parse(JSON.stringify(lead, null, 2));
    var datas = { leads: dats };
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

exports.editLead = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    var leadId = parseData.leadId;
    var emailId = parseData.emailId;
    var name = parseData.name;
    var phoneNo = parseData.phoneNo;
    var address = null;
    if (parseData.address) {
      var address = parseData.address;
    }
    var IntrestedIn = null;
    if (parseData.IntrestedIn) {
      var IntrestedIn = parseData.IntrestedIn;
    }
    var projectid = null;
    if (parseData.projectid) {
      var projectid = parseData.projectid;
    }

    var inventoryid = null;
    if (parseData.inventoryid) {
      var inventoryid = parseData.inventoryid;
    }
    var landid = null;
    if (parseData.landid) {
      var landid = parseData.landid;
    }
    var propertyid = null;
    if (parseData.propertyid) {
      var propertyid = parseData.propertyid;
    }
    var token = parseData.token;
    var dat = parseData.dat;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    await leads
      .update(
        {
          emailId,
          name,
          phoneNo,
          address,
          IntrestedIn,
          projectid,
          inventoryid,
          landid,
          propertyid,
        },
        {
          where: {
            leadId: leadId,
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

    var datas = { message: "successfully edited" };
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

exports.deleteLead = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    var leadId = parseData.leadId;
    var token = parseData.token;
    var dat = parseData.dat;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    await leads
      .destroy({
        where: {
          leadId: leadId,
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

    var datas = { message: "successfully deleted the Lead" };
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

exports.deleteLeads = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    var token = parseData.token;
    var dat = parseData.dat;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    await leads.destroy({ where: {} }).catch((err) => {
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

    var datas = { message: "successfully deleted All Leads" };
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

exports.assignClient = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    // history
    var token = parseData.token;
    var dat = parseData.dat;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    leads
      .create({
        phoneNo: parseData.phoneNo,
        FollowUpDate: parseData.FollowUpDate,
        projectid: parseData.project,
        IntrestedIn: parseData.IntrestedIn,
        comments: parseData.comments,
        name: parseData.name,
        createdBy: parseData.createdBy,
        updatedBy: parseData.updatedBy,
        emailId: parseData.emailId,
        phoneNo: parseData.phoneNo,
        uploadedBy: parseData.uploadedBy,
        Intrested: parseData.Intrested,
        assignAgent: parseData.assignAgent,
        status: parseData.status,
        time: parseData.time,
        address: parseData.address,
      })
      .then(function (lead) {
        if (lead) {
          history
            .create({
              date: parseData.history.date,
              FollowUpDate: parseData.history.FollowUpDate,
              ProjectIntrestId: parseData.history.ProjectIntrestId,
              IntrestedIn: parseData.history.IntrestedIn,
              comments: parseData.history.comments,
              createdBy: parseData.history.createdBy,
              leadId: lead.dataValues.leadId,
            })
            .then(function (history) {
              if (history) {
                var send = {
                  version: "v1",
                  rCode: 100,
                  results: { message: "all Done" },
                };
                e = "";
                ec = 104;
                res.send(send);
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

exports.getClients = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);
    if (parseData.type !== "admin") {
      const lead = await leads
        .findAll({
          include: [
            {
              model: user,
              attributes: ["name"],
            },
            {
              model: history,
              attributes: ["historyid"],
            },
          ],
          where: {
            status: parseData.status,
            assignTo: parseData.assignTo,
          },
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
      var dats = JSON.parse(JSON.stringify(lead, null, 2));
      var datas = { leads: dats };
      var send = {
        version: "v1",
        rCode: 100,
        results: datas,
      };
      res.send(send);
    } else {
      const lead = await leads
        .findAll({
          include: [
            {
              model: user,
              attributes: ["name"],
            },
            {
              model: history,
              attributes: ["historyid"],
            },
          ],
          where: {
            status: parseData.status,
          },
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
      var dats = JSON.parse(JSON.stringify(lead, null, 2));
      var datas = { leads: dats };
      var send = {
        version: "v1",
        rCode: 100,
        results: datas,
      };
      res.send(send);
    }
    const dat = parseData.dat;
    var token = parseData.token;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }
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

exports.getClient = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const leadId = parseData.leadId;
    const dat = parseData.dat;
    var token = parseData.token;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }
    const lead = await leads
      .findOne({
        where: {
          leadId: leadId,
        },
        include: [
          {
            model: user,
            attributes: ["name"],
          },
          {
            model: Project,
            attributes: ["name"],
          },
          {
            model: history,
            include: [
              {
                model: Project,
                attributes: ["name"],
              },
            ],
          },
          {
            model: calllog,
          },
          {
            model: property,
            attributes: ["name"],
          },
          {
            model: Inventory,
            attributes: ["name"],
          },
          {
            model: land,
            attributes: ["name"],
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
    var datas = { lead };
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

function uploadLead(parseData, lines, res) {
  var obj = {};
  var currentline = [];
  try {
    currentline = lines[nooooo].split(",");
  } catch (error) {
    console.log("e2", error);
  }
  var n = currentline[0].split('"');
  var e = currentline[1].split('"');
  var p = currentline[2].split('"');
  var emailId = null;
  if (e[1] !== "") {
    emailId = e[1];
  }
  obj["emailId"] = emailId;
  obj["name"] = n[1];
  obj["phoneNo"] = Number(p[1]);
  obj["time"] = getDateUNIX();
  obj["updatedBy"] = Number(parseData.userid);
  obj["createdBy"] = Number(parseData.userid);
  leads
    .create(obj)
    .then(function (lead) {
      if (lead) {
        result.push("Successfully Inserted " + lead.dataValues.phoneNo);
        if (lines.length === nooooo + 1) {
          var send = {
            version: "v1",
            rCode: 100,
            results: result,
          };
          res.send(send);
          nooooo = 1;
          result = [];
          fs.unlinkSync(pathsss);
        } else {
          nooooo++;
          uploadLead(parseData, lines, res);
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
      result.push(err.errors[0].value + " " + err.errors[0].message);
      if (lines.length === nooooo + 1) {
        var send = {
          version: "v1",
          rCode: 100,
          results: result,
        };
        res.send(send);
        nooooo = 1;
        result = [];
        fs.unlinkSync(pathsss);
      } else {
        nooooo++;
        uploadLead(parseData, lines, res);
      }
    });
}
