const db = require("../Models");
const user = db.users;
// const token = db.token;
const jwt = require("jsonwebtoken");
const {
  validateLoginInput,
  genrateApi,
  decodeApi,
  getDateUNIX,
} = require("../util/validators");
var e = "";
var ec = 104;

function generateToken(user) {
  return jwt.sign(
    {
      id: user.userid,
      email: user.email,
      name: user.name,
      date: new Date(),
    },
    "pentagon",
    { expiresIn: "1h" }
  );
}

async function saveToken(
  TokenNumber,
  GenratedByEmail,
  Validity,
  GenratedAt,
  Type,
  Plan
) {
  const newToken = new token({
    TokenNumber: TokenNumber,
    GenratedByEmail: GenratedByEmail,
    Validity: Validity.toISOString(),
    GenratedAt: GenratedAt.toISOString(),
    Type: Type,
    Plan: Plan,
  });
  const tokensa = await newToken.save();
}

exports.login = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);

    const passwords = parseData.password;
    const email = parseData.email;
    const dat = parseData.dat;

    const { errors, valid } = validateLoginInput(email, passwords);

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    if (!valid) {
      e = e + errors;
      ec = 104;
      throw new Error("error");
    }

    const users = await user
      .findOne({
        where: {
          email: email,
        },
      })
      .catch((err) => {
        e = e + err;
        ec = 104;
        throw new Error("error");
      });

    if (!users) {
      e = e + "Invalid Email";
      ec = 104;
      throw new Error("error");
    }

    if (users.password !== passwords) {
      e = e + "Invalid Password";
      ec = 104;
      throw new Error("error");
    }

    await user
      .update(
        { status: 1 },
        {
          where: {
            email: email,
          },
        }
      )
      .catch((err) => {
        e = e + err;
        ec = 104;
        throw new Error("error");
      });

    var datas = {
      userid: users.userid,
      email: users.email,
      name: users.name,
      password: users.password,
      type: users.type,
      status: users.status,
      designation: users.designation,
      phone: users.phone,
      salary: users.salary,
      address: users.address,
      cnic: users.cnic,
      prohibition: users.prohibition,
      updatedBy: users.updatedBy,
      createdBy: users.createdBy,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      token: generateToken(users),
    };

    var send = {
      version: "v1",
      rCode: 100,
      results: genrateApi(JSON.stringify(datas)),
    };
    res.send(send);
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

exports.logout = async (req, res) => {
  try {
    const data = req.body.data;
    var d = decodeApi(data);
    var parseData = JSON.parse(d);
    console.log("logout", parseData);
    var userid = parseData.userid;
    var token = parseData.token;
    var dat = parseData.dat;

    if (getDateUNIX() !== dat) {
      e = e + "Token Expired";
      ec = 104;
      throw new Error("error");
    }

    await user
      .update(
        { status: 0 },
        {
          where: {
            userid: userid,
          },
        }
      )
      .catch((err) => {
        console.log(err);
        e = e + err;
        ec = 104;
        throw new Error("error");
      });

    var datas = { message: "successfull" };
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

exports.insertSalesAgent = async (req, res) => {
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
    user
      .create({
        password: parseData.password,
        email: parseData.email,
        name: parseData.name,
        type: parseData.type,
        address: parseData.address,
        phone: parseData.phone,
        cnic: parseData.cnic,
        designation: parseData.designation,
        salary: parseData.salary,
        prohibition: parseData.prohibition,
        uploadedBy: parseData.uploadedBy,
        status: parseData.status,
        updatedBy: parseData.updatedBy,
        createdBy: parseData.createdBy,
      })
      .then(function (users) {
        if (users) {
          console.log(users.dataValues);
          var send = {
            version: "v1",
            rCode: 100,
            results:{ userid: users.dataValues.userid }
          };
          e = "";
          ec = 104;
          res.send(send);
        } else {
          var senda = {
            version: "v1",
            rCode: ec,
            results: { error: "Error in insert new record" },
          };
          ec = 104;
          e = "";
          res.send(senda);
        }
      })
      .catch((err) => {
        var senda = {
          version: "v1",
          rCode: ec,
          results: { error: err?.errors[0]?.message },
        };
        ec = 104;
        e = "";
        res.send(senda);
      });
  } catch (err) {
    console.log("err", e);
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

exports.viewSalesAgent = async (req, res) => {
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
    const usesr = await user
      .findAll({ where: { type: "agent" } })
      .catch((err) => {
        var senda = {
          version: "v1",
          rCode: 104,
          results: { error: err?.errors[0]?.message },
        };
        e = "";
        ec = 104;
        res.send(senda);
        return false;
      });
    var dats = JSON.parse(JSON.stringify(usesr, null, 2));
    var datas = { users: dats };
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

exports.editUser = async (req, res) => {
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
    user
    .update(
      {
        password: parseData.password,
        email: parseData.email,
        name: parseData.name,
        type: parseData.type,
        address: parseData.address,
        phone: parseData.phone,
        cnic: parseData.cnic,
        designation: parseData.designation,
        salary: parseData.salary,
        prohibition: parseData.prohibition,
        uploadedBy: parseData.uploadedBy,
        status: parseData.status,
        updatedBy: parseData.updatedBy,
        createdBy: parseData.createdBy,
      },
      {
        where: {
          userid: parseData.userid,
        },
      }
    )
      
      .catch((err) => {
        console.log(err)
        var senda = {
          version: "v1",
          rCode: ec,
          results: { error: err?.errors[0]?.message },
        };
        ec = 104;
        e = "";
        res.send(senda);
      });
      var datas = { message: "successfully Edited the User" };
      var send = {
        version: "v1",
        rCode: 100,
        results: datas,
      };
      res.send(send);
  } catch (err) {
    console.log("err", e);
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

exports.deleteUser = async (req, res) => {
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
    user
    .destroy({
      where: {
        userid: parseData.userid ,
      },
    })
      
      .catch((err) => {
        var senda = {
          version: "v1",
          rCode: ec,
          results: { error: err?.errors[0]?.message },
        };
        ec = 104;
        e = "";
        res.send(senda);
      });
      var datas = { message: "successfully deleted the User" };
      var send = {
        version: "v1",
        rCode: 100,
        results: datas,
      };
      res.send(send);
  } catch (err) {
    console.log("err", e);
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

// // Create and Save a new user and token.
// exports.create = async (req, res) => {
//   try {
//     var password = req.body.password;
//     var email = req.body.email;
//     var fullname = req.body.fullname;
//     var type = req.body.type;
//     var tokens = req.body.tokens;
//     const { valid, errors } = validateRegisterInput(email, password, fullname);
//     if (!valid) {
//       e = e + errors;
//       ec = 104;
//       throw new Error(errors);
//     }
//     const usersa = await user.findOne({ email });
//     if (usersa) {
//       e = e + "email is already registered, ";
//       ec = 104;
//       throw new Error("email is already registered");
//     }
//     password = await bcrypt.hash(password, 12);
//     const event1 = new Date();
//     const event2 = new Date();
//     event2.setTime(event1.getTime() - event1.getTimezoneOffset() * 120 * 100);
//     const tok = await token.findOne({ TokenNumber: tokens });
//     if (tok) {
//       const val = tok.Validity;
//       const tim = new Date(val);
//       const t = tok.Type;
//       if (t === "admin") {
//         if (!(event1.getTime() < tim.getTime())) {
//           await token.deleteOne({ TokenNumber: tokens });
//           e = e + "validity for this token has expired, ";
//           ec = 106;
//           throw new Error("validity for this token has expired");
//         }
//       } else {
//         type = "user";
//       }
//     } else {
//       type = "user";
//     }
//     var User = {
//       email: email,
//       date: new Date(),
//     };
//     var datae = JSON.stringify(User);
//     var toke = genrateApi(datae);
//     const newUser = new user({
//       email,
//       password,
//       fullname,
//       type,
//       validityOfSubscription: "nill",
//       SubscriptionType: "nill",
//       noOfRequestRemaining: 0,
//       totalCall: 0,
//       planType: "nill",
//       apiKey: toke,
//     });
//     console.log("apikey", toke);
//     const resa = await newUser.save();
//     newMemberEmailSent(email, fullname);
//     var tokena;
//     if (!tokens) {
//       tokena = await generateToken(resa);
//       await saveToken(tokena, email, event2, event1, type);
//     } else {
//       tokena = tokens;
//     }
//     if (!resa) {
//       e = e + "Something Went Wrong";
//       ec = 104;
//       throw new Error("Some Thing Went Wrong");
//     }
//     var idq = resa._id;
//     var fullnameq = resa.fullname;
//     var emailq = resa.email;
//     var typeq = resa.type;
//     var validityOfSubscriptionq = resa.validityOfSubscription;
//     var SubscriptionTypeq = resa.SubscriptionType;
//     var noOfRequestRemainingq = resa.noOfRequestRemaining;
//     var totalCallq = resa.totalCall;
//     var updatedAtq = resa.updatedAt;
//     var createdAtq = resa.createdAt;
//     var planTypeq = resa.planType;
//     var apik = resa.apiKey;
//     console.log(apik);
//     var data = {
//       id: idq,
//       fullname: fullnameq,
//       email: emailq,
//       type: typeq,
//       validityOfSubscription: validityOfSubscriptionq,
//       SubscriptionType: SubscriptionTypeq,
//       planType: planTypeq,
//       noOfRequestRemaining: noOfRequestRemainingq,
//       totalCall: totalCallq,
//       updatedAt: updatedAtq,
//       createdAt: createdAtq,
//       token: tokena,
//       apiKey: apik,
//     };
//     console.log(data);
//     var send = {
//       version: "v10",
//       rCode: 100,
//       results: [data],
//     };
//     res.send(send);
//   } catch (err) {
//     var dataa = { error: e + err };
//     console.log("err", err, e);
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [dataa],
//     };
//     e = "";
//     ec = 104;
//     res.send(senda);
//   }
// };

// // Find a user Tutorial with an id and token.
// exports.subcribe = async (req, res) => {
//   try {
//     var email = req.body.email;
//     var tokena = req.body.token;
//     var plan = req.body.plan;
//     var subscriptionType = req.body.subscriptionType;
//     if (!(email && tokena && plan && subscriptionType)) {
//       e = e + "Fields Are Required";
//       ec = 101;
//       throw new Error("error");
//     }
//     var request = 0;
//     var p;
//     switch (subscriptionType) {
//       case "basic":
//         request = 1000;
//         break;
//       case "standard":
//         request = 10000;
//         break;
//       case "premium":
//         request = 100000;
//         break;
//     }
//     if (plan === "M") {
//       p = "core";
//     } else if (plan === "Y") {
//       p = "geo";
//     }
//     //Query by postal code, city, and/or state to retrieve all matching results.
//     //M core
//     //9   basic     1000
//     //19  standard  10000
//     //29  premium   100000

//     //Query by a specific street address for a single exact matched rate
//     //Y geo
//     //49   basic     1000
//     //99   standard  10000
//     //199  premium   100000
//     const tok = await token.findOne({ TokenNumber: tokena });
//     if (tok) {
//       var event1 = new Date();
//       const val = tok.Validity;
//       const tim = new Date(val);
//       const eee = tok.GenratedByEmail;
//       if (event1.getTime() < tim.getTime()) {
//         if (eee === email) {
//           var now = new Date();
//           now.setMonth(now.getMonth() + 1);
//           var current = new Date(now);
//           const U = await user.updateOne(
//             { email },
//             {
//               noOfRequestRemaining: request,
//               SubscriptionType: subscriptionType,
//               planType: p,
//               validityOfSubscription: current.toISOString(),
//             }
//           );
//           if (!U) {
//             e = e + "User not Found";
//             ec = 104;
//             throw new Error("error");
//           }
//         } else {
//           e = e + "Email is not the same as User";
//           ec = 104;
//           throw new Error("error");
//         }
//       } else {
//         await token.deleteOne({ TokenNumber: tokena });
//         e = e + "validity for this token has expired";
//         ec = 106;
//         throw new Error("error");
//       }
//     } else {
//       await token.deleteOne({ TokenNumber: tokena });
//       e = e + "validity for the token has expire";
//       ec = 106;
//       throw new Error("error");
//     }
//     var data = {
//       message: "User Successfully subscribed",
//       subscriptionType: subscriptionType,
//       totalRequest: request,
//       planType: p,
//     };
//     var send = {
//       version: "v10",
//       rCode: 100,
//       results: [data],
//     };
//     res.send(send);
//   } catch (err) {
//     var dataa = { error: e + err };
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [dataa],
//     };
//     e = "";
//     ec = 104;
//     res.send(senda);
//   }
// };

// // Retrieve all user from the database or by type and token.
// exports.findAll = async (req, res) => {
//   try {
//     const tokens = req.query.token;
//     const type = req.query.type;
//     if (!tokens) {
//       e = e + "Fields Are Required";
//       ec = 101;
//       throw new Error("error");
//     }
//     var condition = type
//       ? { type: { $regex: new RegExp(type), $options: "i" } }
//       : {};
//     const event1 = new Date();
//     var resa;
//     const tok = await token.findOne({ TokenNumber: tokens });
//     if (tok) {
//       const val = tok.Validity;
//       const tim = new Date(val);
//       const t = tok.Type;
//       if (t === "admin") {
//         if (event1.getTime() < tim.getTime()) {
//           resa = await user.find(condition);
//         } else {
//           await token.deleteOne({ TokenNumber: tokens });
//           e = e + "validity for this token has expired";
//           ec = 106;
//           throw new Error("error");
//         }
//       } else {
//         e = e + "Your are not Admin";
//         ec = 104;
//         throw new Error("error");
//       }
//     } else {
//       await token.deleteOne({ TokenNumber: tokens });
//       e = e + "validity for the token has expire";
//       ec = 106;
//       throw new Error("error");
//     }
//     var data = [];
//     if (!resa) {
//       e = e + "Something Went Wrong";
//       ec = 104;
//       throw new Error("error");
//     }
//     for (let ii = 0; ii < resa.length; ii++) {
//       const element = resa[ii];
//       var idq = element._id;
//       var fullnameq = element.fullname;
//       var emailq = element.email;
//       var typeq = element.type;
//       var validityOfSubscriptionq = element.validityOfSubscription;
//       var SubscriptionTypeq = element.SubscriptionType;
//       var noOfRequestRemainingq = element.noOfRequestRemaining;
//       var totalCallq = element.totalCall;
//       var createdAtq = element.createdAt;
//       var updatedAtq = element.updatedAt;
//       var apik = element.apiKey;
//       var dota = {
//         id: idq,
//         fullname: fullnameq,
//         email: emailq,
//         type: typeq,
//         validityOfSubscription: validityOfSubscriptionq,
//         SubscriptionType: SubscriptionTypeq,
//         noOfRequestRemaining: noOfRequestRemainingq,
//         apiKey: apik,
//         totalCall: totalCallq,
//         createdAt: createdAtq,
//         updatedAt: updatedAtq,
//       };
//       data[ii] = dota;
//     }
//     var send = {
//       version: "v10",
//       rCode: 100,
//       results: [data],
//     };
//     res.send(send);
//   } catch (err) {
//     var dataa = { error: e + err };
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [dataa],
//     };
//     e = "";
//     ec = 104;
//     res.send(senda);
//   }
// };

// // Find a user Tutorial with an id and token.
// exports.findOne = async (req, res) => {
//   try {
//     const tokens = req.query.token;
//     const id = req.params.id;
//     var remainingSubscription = null;
//     if (!(tokens && id)) {
//       e = e + "Fields Are Required";
//       ec = 101;
//       throw new Error("error");
//     }
//     const event1 = new Date();
//     var resa;
//     const tok = await token.findOne({ TokenNumber: tokens });
//     if (tok) {
//       const val = tok.Validity;
//       const tim = new Date(val);
//       const t = tok.Type;
//       if (event1.getTime() < tim.getTime()) {
//         resa = await user.findOne({ _id: id });
//       } else {
//         await token.deleteOne({ TokenNumber: tokens });
//         e = e + "validity for this token has expired";
//         ec = 106;
//         throw new Error("error");
//       }
//     } else {
//       await token.deleteOne({ TokenNumber: tokens });
//       e = e + "validity for the token has expire";
//       ec = 106;
//       throw new Error("error");
//     }
//     if (!resa) {
//       e = e + "Something Went Wrong";
//       ec = 104;
//       throw new Error("error");
//     }
//     var idq = resa._id;
//     var fullnameq = resa.fullname;
//     var emailq = resa.email;
//     var typeq = resa.type;
//     var validityOfSubscriptionq = resa.validityOfSubscription;
//     var SubscriptionTypeq = resa.SubscriptionType;
//     var noOfRequestRemainingq = resa.noOfRequestRemaining;
//     var totalCallq = resa.totalCall;
//     var updatedAtq = resa.updatedAt;
//     var createdAtq = resa.createdAt;
//     var phone = resa.phone;
//     var apik = resa.apiKey;
//     if (!(validityOfSubscriptionq === "nill")) {
//       var date1 = new Date();
//       var date2 = new Date(validityOfSubscriptionq);
//       var Difference_In_Time = date2.getTime() - date1.getTime();
//       var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
//       Difference_In_Days = Number(Difference_In_Days) * 1.0;
//       var final = Math.floor(Difference_In_Days);
//       remainingSubscription = String(final) + " Days";
//       if (final <= 0) {
//         remainingSubscription = "Not Avaliable";
//       }
//       if (noOfRequestRemainingq <= 0) {
//         remainingSubscription = "Avaliable";
//       }
//     } else {
//       remainingSubscription = "No Plan";
//     }

//     var data = {
//       id: idq,
//       phone: phone,
//       fullname: fullnameq,
//       email: emailq,
//       type: typeq,
//       apiKey: apik,
//       validityOfSubscription: validityOfSubscriptionq,
//       SubscriptionType: SubscriptionTypeq,
//       noOfRequestRemaining: noOfRequestRemainingq,
//       totalCall: totalCallq,
//       updatedAt: updatedAtq,
//       createdAt: createdAtq,
//       remainingSubscription,
//     };
//     var send = {
//       version: "v10",
//       rCode: 100,
//       results: [data],
//     };
//     res.send(send);
//   } catch (err) {
//     var dataa = { error: e + err };
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [dataa],
//     };
//     e = "";
//     ec = 104;
//     res.send(senda);
//   }
// };

// // Update a user by the id in the request with token.
// exports.update = async (req, res) => {
//   try {
//     const tokens = req.body.token;
//     const email = req.body.email;
//     const fullname = req.body.fullname;
//     const phone = req.body.phone;
//     if (!(tokens && email)) {
//       e = e + "Fields Are Required";
//       ec = 101;
//       throw new Error("error");
//     }
//     var resa;
//     const event1 = new Date();
//     const tok = await token.findOne({ TokenNumber: tokens });
//     if (tok) {
//       const val = tok.Validity;
//       const tim = new Date(val);
//       const t = tok.Type;
//       const em = tok.GenratedByEmail;
//       if (t === "admin") {
//         if (event1.getTime() < tim.getTime()) {
//           resa = await user.updateOne(
//             { email },
//             {
//               fullname: fullname,
//               phone: phone,
//             }
//           );
//           if (!resa) {
//             e = e + "User not Found";
//             ec = 104;
//             throw new Error("error");
//           }
//         } else {
//           await token.deleteOne({ TokenNumber: tokens });
//           e = e + "validity for this token has expired";
//           ec = 106;
//           throw new Error("error");
//         }
//       } else {
//         if (email === em) {
//           if (event1.getTime() < tim.getTime()) {
//             resa = await user.updateOne(
//               { email },
//               {
//                 fullname: fullname,
//                 phone: phone,
//               }
//             );
//             if (!resa) {
//               e = e + "User not Found";
//               ec = 104;
//               throw new Error("error");
//             }
//           } else {
//             await token.deleteOne({ TokenNumber: tokens });
//             e = e + "validity for this token has expired";
//             ec = 106;
//             throw new Error("error");
//           }
//         } else {
//           e = e + "Wrong Email";
//           ec = 104;
//           throw new Error("error");
//         }
//       }
//     } else {
//       await token.deleteOne({ TokenNumber: tokens });
//       e = e + "validity for this token has expired";
//       ec = 106;
//       throw new Error("error");
//     }

//     if (!resa) {
//       e = e + "Something Went Wrong";
//       ec = 104;
//       throw new Error("error");
//     }

//     var send = {
//       version: "v10",
//       rCode: 100,
//       results: {
//         fullname: fullname,
//         phone: phone,
//       },
//     };
//     res.send(send);
//   } catch (err) {
//     var dataa = { error: e + err };
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [dataa],
//     };
//     e = "";
//     ec = 0;
//     res.send(senda);
//   }
// };

// // Update a user by the id in the request with token.
// exports.updatePassword = async (req, res) => {
//   try {
//     var tokens = req.body.token;
//     var email = req.body.email;
//     var oldPassword = req.body.oldPassword;
//     var newPassword = req.body.newPassword;
//     var confirmPassword = req.body.confirmPassword;
//     if (!(tokens && email && oldPassword && newPassword && confirmPassword)) {
//       e = e + "Fields Are Required";
//       ec = 101;
//       throw new Error("error");
//     }
//     if (oldPassword === "") {
//       e = e + "Password must not be empty";
//       ec = 101;
//       throw new Error("error");
//     } else if (newPassword === "") {
//       e = e + "Password must not be empty";
//       ec = 101;
//       throw new Error("error");
//     } else if (newPassword !== confirmPassword) {
//       e = e + "Passwords must match";
//       ec = 101;
//       throw new Error("error");
//     }
//     newPassword = await bcrypt.hash(newPassword, 12);
//     oldPassword = await bcrypt.hash(oldPassword, 12);
//     var resa;
//     const event1 = new Date();
//     const event2 = new Date();
//     event2.setTime(event1.getTime() - event1.getTimezoneOffset() * 120 * 100);

//     const tok = await token.findOne({ TokenNumber: tokens });
//     if (tok) {
//       const val = tok.Validity;
//       const tim = new Date(val);
//       const t = tok.Type;
//       const em = tok.GenratedByEmail;
//       if (t === "admin") {
//         if (event1.getTime() < tim.getTime()) {
//           const U = await user.findOne({ email });

//           if (!U) {
//             e = e + "User not found";
//             ec = 104;
//             throw new Error("error");
//           }

//           const match = await bcrypt.compare(oldPassword, user.password);
//           if (!match) {
//             e = e + "Wrong crendetials";
//             ec = 104;
//             throw new Error("error");
//           }

//           resa = await user.updateOne(
//             { email },
//             {
//               password: newPassword,
//             }
//           );
//         } else {
//           await token.deleteOne({ TokenNumber: tokens });
//           e = e + "validity for this token has expired";
//           ec = 106;
//           throw new Error("error");
//         }
//       } else {
//         if (email === em) {
//           if (event1.getTime() < tim.getTime()) {
//             const U = await user.findOne({ email });

//             if (!U) {
//               e = e + "User not found";
//               ec = 104;
//               throw new Error("error");
//             }

//             const match = await bcrypt.compare(oldPassword, user.password);
//             if (!match) {
//               e = e + "Wrong crendetials";
//               ec = 104;
//               throw new Error("error");
//             }

//             resa = await user.updateOne(
//               { email },
//               {
//                 password: newPassword,
//               }
//             );
//           } else {
//             await token.deleteOne({ TokenNumber: tokens });
//             e = e + "validity for this token has expired";
//             ec = 106;
//             throw new Error("error");
//           }
//         } else {
//           e = e + "Wrong Email";
//           ec = 104;
//           throw new Error("error");
//         }
//       }
//     } else {
//       await token.deleteOne({ TokenNumber: tokens });
//       e = e + "validity for this token has expired";
//       ec = 106;
//       throw new Error("error");
//     }
//     var data = { message: "successfull" };
//     var send = {
//       version: "v10",
//       rCode: 100,
//       results: [data],
//     };
//     res.send(send);
//   } catch (err) {
//     var dataa = { error: e + err };
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [dataa],
//     };
//     e = "";
//     ec = 104;
//     res.send(senda);
//   }
// };

// // Update a user by the id in the request with token.
// exports.forgotPassword = async (req, res) => {
//   try {
//     console.log("email", req.body.email);
//     var email = req.body.email;

//     if (!email) {
//       e = e + "Fields Are Required";
//       ec = 101;
//       throw new Error("error");
//     }
//     const U = await user.findOne({ email: email });

//     if (U) {
//       var password = U.password;
//       var username = U.username;
//       var key = { password: password, email: email, date: new Date() };
//       var apiKey = genrateApi(JSON.stringify(key));
//       forgotpasswordEmailSent(email, username, apiKey);
//     } else {
//       e = e + "User not found";
//       ec = 104;
//       throw new Error("error");
//     }
//     var data = { message: "successfull" };
//     var send = {
//       version: "v10",
//       rCode: 100,
//       results: [data],
//     };
//     res.send(send);
//   } catch (err) {
//     var dataa = { error: e + err };
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [dataa],
//     };
//     e = "";
//     ec = 104;
//     res.send(senda);
//   }
// };

// exports.emailPassword = async (req, res) => {
//   try {
//     var key = decodeApi(req.body.key);
//     var d = JSON.parse(key);
//     console.log(d);
//     var email = d.email;
//     var oldPassword = d.oldPassword;
//     var newPassword = d.newPassword;
//     var dae = new Date(d.date);
//     var eve = new Date();
//     if (dae.getMinutes() !== eve.getMinutes()) {
//       e = e + "Time Out";
//       ec = 101;
//       throw new Error("error");
//     }
//     if (!key) {
//       e = e + "Fields Are Required";
//       ec = 101;
//       throw new Error("error");
//     }
//     if (newPassword === "") {
//       e = e + "Password must not be empty";
//       ec = 101;
//       throw new Error("error");
//     }
//     if (oldPassword === "") {
//       e = e + "Password must not be empty";
//       ec = 101;
//       throw new Error("error");
//     }
//     newPassword = await bcrypt.hash(newPassword, 12);
//     var resa;
//     const Usera = await user.findOne({ email });
//     if (Usera) {
//       if (oldPassword === Usera.password) {
//         resa = await user.updateOne(
//           { email },
//           {
//             password: newPassword,
//           }
//         );
//       } else {
//         e = e + "Wrong crendetials";
//         ec = 104;
//         throw new Error("error");
//       }
//     } else {
//       e = e + "User Not Found";
//       ec = 104;
//       throw new Error("error");
//     }

//     var data = { message: "successfull" };
//     var send = {
//       version: "v10",
//       rCode: 100,
//       results: [data],
//     };
//     res.send(send);
//   } catch (err) {
//     var dataa = { error: e + err };
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [dataa],
//     };
//     e = "";
//     ec = 104;
//     res.send(senda);
//   }
// };

// exports.resetApiKey = async (req, res) => {
//   try {
//     console.log("resetApiKey", req.body);
//     var email = req.body.email;
//     var tokens = req.body.token;
//     var apiKe = req.body.apiKey;
//     var tokes;
//     if (!(tokens && email && apiKe)) {
//       e = e + "Fields Are Required";
//       ec = 101;
//       throw new Error("error");
//     }
//     const event1 = new Date();
//     var resa;
//     const tok = await token.findOne({ TokenNumber: tokens });
//     if (tok) {
//       const val = tok.Validity;
//       const tim = new Date(val);
//       if (event1.getTime() < tim.getTime()) {
//         if (email === tok.GenratedByEmail) {
//           const U = await user.findOne({ email: email });
//           if (U) {
//             var api = U.apiKey;
//             if (api === apiKe) {
//               var Usera = {
//                 email: email,
//                 date: new Date(),
//               };
//               var datae = JSON.stringify(Usera);
//               tokes = genrateApi(datae);
//               resa = await user.updateOne(
//                 { email },
//                 {
//                   apiKey: tokes,
//                 }
//               );
//             }
//           } else {
//             e = e + "User not found";
//             ec = 104;
//             throw new Error("error");
//           }
//         } else {
//           e = e + "Email is not the same as User";
//           ec = 104;
//           throw new Error("error");
//         }
//       } else {
//         await token.deleteOne({ TokenNumber: tokens });
//         e = e + "validity for this token has expired";
//         ec = 106;
//         throw new Error("error");
//       }
//     } else {
//       await token.deleteOne({ TokenNumber: tokens });
//       e = e + "validity for the token has expire";
//       ec = 106;
//       throw new Error("error");
//     }
//     if (!resa) {
//       e = e + "Something Went Wrong";
//       ec = 104;
//       throw new Error("error");
//     }
//     var send = {
//       version: "v10",
//       rCode: 100,
//       results: tokes,
//     };
//     res.send(send);
//   } catch (err) {
//     var dataa = { error: e + err };
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [dataa],
//     };
//     e = "";
//     ec = 104;
//     res.send(senda);
//   }
// };

// // Delete a Tutorial with the specified id in the request with token and email.
// exports.delete = async (req, res) => {
//   try {
//     const tokens = req.query.token;
//     const id = req.query.id;
//     const email = req.query.token;
//     if (!(tokens && email && id)) {
//       e = e + "Fields Are Required";
//       ec = 101;
//       throw new Error("error");
//     }
//     var resa;
//     const event1 = new Date();
//     const event2 = new Date();
//     event2.setTime(event1.getTime() - event1.getTimezoneOffset() * 120 * 100);

//     const tok = await token.findOne({ TokenNumber: tokens });
//     if (tok) {
//       const val = tok.Validity;
//       const tim = new Date(val);
//       const t = tok.Type;
//       const em = tok.GenratedByEmail;
//       if (t === "admin") {
//         if (event1.getTime() < tim.getTime()) {
//           resa = await user.findByIdAndRemove({ _id: id });
//           if (!resa) {
//             e = e + "User not Found";
//             ec = 104;
//             throw new Error("error");
//           }
//         } else {
//           await token.deleteOne({ TokenNumber: tokens });
//           e = e + "validity for this token has expired";
//           ec = 106;
//           throw new Error("error");
//         }
//       } else {
//         if (email === em) {
//           if (event1.getTime() < tim.getTime()) {
//             resa = await user.findByIdAndRemove({ _id: id });
//             if (!resa) {
//               e = e + "User not Found";
//               ec = 104;
//               throw new Error("error");
//             }
//           } else {
//             await token.deleteOne({ TokenNumber: tokens });
//             e = e + "validity for this token has expired";
//             ec = 106;
//             throw new Error("error");
//           }
//         } else {
//           e = e + "Wrong Email";
//           ec = 104;
//           throw new Error("error");
//         }
//       }
//     } else {
//       await token.deleteOne({ TokenNumber: tokens });
//       e = e + "validity for this token has expired";
//       ec = 106;
//       throw new Error("error");
//     }
//     var data = { message: "successfull" };
//     var send = {
//       version: "v10",
//       rCode: 100,
//       results: [data],
//     };
//     res.send(send);
//   } catch (err) {
//     var dataa = { error: e + err };
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [dataa],
//     };
//     e = "";
//     ec = 104;
//     res.send(senda);
//   }
// };

// exports.test = async (req, res) => {
//   try {
//     var a = md5("message");
//     console.log("encrypt", a);
//     hash('md5', s, format);

//     let name = 'abcd'
// let password = '123'
// let user_ticket = hash(hash(name + hash(password)))
// Console. Log (user_ticket)
//     var rev = ReverseMd5({
//       lettersUpper: false,
//       lettersLower: true,
//       numbers: true,
//       special: false,
//       whitespace: true,
//       maxLen: 12,
//     });
//     // rev('49f68a5c8493ec2c0bf489821c21fc3b')
//     // 49f68a5c8493ec2c0bf489821c21fc3b
//     // 78e731027d8fd50ed642340b7c9a63b3
//     console.log("decrypt", rev("78e731027d8fd50ed642340b7c9a63b3"));
//     res.send("send");
//   } catch (err) {
//    var dataa = { error: e + err };
//     var senda = {
//       version: "v10",
//       rCode: ec,
//       results: [data],
//     };
//     e = "";
//     ec = 104;
//     res.send(send);
//   }
// };

// const hash = (method, s, format) => {
//   var sum = crypto.createHash(method);
//   var isBuffer = Buffer.isBuffer(s);
//   if(!isBuffer && typeof s === 'object') {
//       s = JSON.stringify(sortObject(s));
//   }
//   sum.update(s, isBuffer ? 'binary' : 'utf8');
//   return sum.digest(format || 'hex');
// };
