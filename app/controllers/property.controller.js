const db = require("../Models");
const property = db.property;
// const token = db.token;
const { genrateApi, decodeApi, getDateUNIX } = require("../util/validators");

var e = "";
var ec = 104;

exports.getPropertys = async (req, res) => {
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
        const propertys = await property.findAll().catch((err) => {
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
        var dats = JSON.parse(JSON.stringify(propertys, null, 2));
        var datas = { propertys: dats };
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