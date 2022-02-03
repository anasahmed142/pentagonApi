// const nodemailer = require("nodemailer");
var CryptoJS = require("crypto-js");
var key = "14d3135d02f91437169464275a38ded7d3cb2d794bc084a0001ff219502943ab";
var iv = "0779d50565834a2808f436fa121ebc3b";

module.exports.validateRegisterInput = (email, password, fullname) => {
  const errors = {};
  if (email === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not empty";
  }
  if (fullname === "") {
    errors.fullname = "fullname must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  try {
    if (username.trim() === "") {
      errors.username = "Username must not be empty";
    }
    if (password.trim() === "") {
      errors.password = "Password must not be empty";
    }
  } catch (error) {
    errors.error = error;
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.newMemberEmailSent = async (to, username) => {
  // var transporter = nodemailer.createTransport({
  //   host: "smtp-mail.outlook.com", // hostname
  //   secureConnection: false, // TLS requires secureConnection to be false
  //   port: 587, // port for secure SMTP
  //   tls: {
  //     ciphers: "SSLv3",
  //   },
  //   auth: {
  //     // user: "taxegy@outlook.com",
  //     // pass: "taxttoPay1",
  //     user: "anas.ahmed142@hotmail.com",
  //     pass: "0545382080",
  //   },
  // });

  // var mailOptions = {
  //   //from: "taxegy@outlook.com",
  //   from: "anas.ahmed142@hotmail.com",
  //   to,
  //   subject: "WelCome to Taxegy" + username,
  //   html:
  //     "<h1>Welcome to Taxegy</h1><br><h2>" +
  //     username +
  //     "</h2><br>  for futher Details goto www.taxegy.com",
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
  // admin
  //   .firestore()
  //   .collection("mail")
  //   .add({
  //     to: to,
  //     message: {
  //       subject: "WelCome to Taxegy" + username,
  //       html:
  //         "<h1>Welcome to Taxegy</h1><br><h2>" +
  //         username +
  //         "</h2><br>  for futher Details goto https://taxigydashboard.web.app/",
  //     },
  //   })
  //   .then(() => console.log("Queued email for delivery!"))
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

module.exports.forgotpasswordEmailSent = (to, username, apiKey) => {
  // var transporter = nodemailer.createTransport({
  //   host: "smtp-mail.outlook.com", // hostname
  //   secureConnection: false, // TLS requires secureConnection to be false
  //   port: 587, // port for secure SMTP
  //   tls: {
  //     ciphers: "SSLv3",
  //   },
  //   auth: {
  //     // user: "taxegy@outlook.com",
  //     // pass: "taxttoPay1",
  //     user: "anas.ahmed142@hotmail.com",
  //     pass: "0545382080",
  //   },
  // });

  // var mailOptions = {
  //   //from: "taxegy@outlook.com",
  //   from: "anas.ahmed142@hotmail.com",
  //   to,
  //   subject: "Forgot Password for" + username,
  // //   html:
  // //     "<h1>Forgot Password for Taxegy</h1><br>" +
  // //     "<br>Click here to Reset Password " +
  // //     "<br>https://taxigydashboard.web.app/change-pass?key=" +
  // //     apiKey,
  // // };

  // // transporter.sendMail(mailOptions, (error, info) => {
  // //   if (error) {
  // //     console.log(error);
  // //   } else {
  // //     console.log("Email sent: " + info.response);
  // //   }
  // Error: Invalid login: 534-5.7.14 <
  // https://accounts.google.com/signin/continue?sarp=1&scc=1&plt=AKgnsbt534-5.7.14 fAzuoeRgFZ1cnBvx-UI6w7LHMhGwkM22Vps5cncJ076R9PL5odVczSUCPu7zWeZ0kvJpu534-5.7.14 5T2ep8hGbEfpY8Yd2bNyD_5xlXGtY1UDSolPEwcP_8GmWqPuX4faFYiL7mg7w9-D
  // >
  // 534-5.7.14
  // Please log in via your web browser and then try again.534-5.7.14
  // Learn more at534 5.7.14
  // https://support.google.com/mail/answer/78754
  // v14sm3789380ilu.78 - gsmtp
  // // });

  // admin
  //   .firestore()
  //   .collection("mail")
  //   .add({
  //     to: to,
  //     message: {
  //       subject: "Forgot Password for" + username,
  //       html:
  //         "<h1>Forgot Password for Taxegy</h1><br>" +
  //         "<br>This link will expire in 1 hour " +
  //         "<br>" +
  //         "<br>" +
  //         "<br>" +
  //         "<br>Click here to Reset Password " +
  //         "<br>https://taxigydashboard.web.app/change-pass/" +
  //         apiKey,
  //     },
  //   })
  //   .then(() => console.log("Queued email for delivery!"))
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

module.exports.genrateApi = (datae) => {
  var encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(datae),
    CryptoJS.enc.Hex.parse(key),
    {
      iv: CryptoJS.enc.Hex.parse(iv),
    }
  );
  return encrypted.ciphertext.toString();
};

module.exports.decodeApi = (datae) => {
  var cipherParams2 = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(datae),
  });
  var decrypted2 = CryptoJS.AES.decrypt(
    cipherParams2,
    CryptoJS.enc.Hex.parse(key),
    {
      iv: CryptoJS.enc.Hex.parse(iv),
    }
  );
  return decrypted2.toString(CryptoJS.enc.Utf8);
};

module.exports.getDateUNIX = () => {
  var t = new Date();
  var day = t.getDate();
  var year = t.getFullYear();
  var mounth = t.getMonth();
  var hour = t.getHours();
  var min = t.getMinutes();
  return new Date(year, mounth, day, hour, 0, 0, 0) / 1000;
};
