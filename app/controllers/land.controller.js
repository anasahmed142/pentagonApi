const db = require("../Models");
const lands = db.land;
// const token = db.token;
const { genrateApi, decodeApi, getDateUNIX } = require("../util/validators");

var e = "";
var ec = 104;

exports.setLand = async (req, res) => {
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
    lands
      .create({
        name: parseData.name,
        address: parseData.address,
        sizeinAcre: parseData.sizeinAcre,
        refrenceName: parseData.refrenceName,
        phoneNoOfRefrence: parseData.phoneNoOfRefrence,
        marker: parseData.marker,
        extraInfo: parseData.extraInfo,
        createdBy: parseData.createdBy,
        updatedBy: parseData.updatedBy,
      })
      .then(function (land) {
        if (land) {
          var send = {
            version: "v1",
            rCode: 100,
            results: { landid: land.dataValues.landid },
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

exports.getLands = async (req, res) => {
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
    const land = await lands.findAll().catch((err) => {
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
    var dats = JSON.parse(JSON.stringify(land, null, 2));
    var datas = { lands: dats };
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

exports.getLand = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const landid = parseData.landid;
    const dat = parseData.dat;
    var token = parseData.token;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }
    const land = await lands
      .findOne({
        where: {
          landid: landid,
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
    var datas = { land };
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

exports.deleteLand = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const landid = parseData.landid;
    var token = parseData.token;
    var dat = parseData.dat;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    await lands
      .destroy({
        where: {
          landid: landid,
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

    var datas = { message: "successfully deleted the land" };
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

exports.editLand = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);
    const landid = parseData.landid;
    const dat = parseData.dat;
    var token = parseData.token;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }
    await lands
      .update(
        {
          name: parseData.name,
          address: parseData.address,
          sizeinAcre: parseData.sizeinAcre,
          refrenceName: parseData.refrenceName,
          extraInfo: parseData.extraInfo,
          phoneNoOfRefrence: parseData.phoneNoOfRefrence,
          marker: parseData.marker,
          updatedBy: parseData.updatedBy,
        },
        {
          where: {
            landid: landid,
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

    var datas = { message: "successfully edited land" };
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

exports.makeLandDeal = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const landid = parseData.landid;
    var token = parseData.token;
    var dat = parseData.dat;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    await lands
      .update(
        {
          agreedCostPerAcre: parseData.agreedCostPerAcre,
          totalTokenMoney: parseData.totalTokenMoney,
          profitCost: parseData.profitCost,
          totalCost: parseData.totalCost,
          status: parseData.status,
          paidPayments: parseData.paidPayments,
          scheduleOfPayment: parseData.scheduleOfPayment,
          updatedBy: parseData.updatedBy,
        },
        {
          where: {
            landid: landid,
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

    var datas = { message: "successfully Make the Deal" };
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
