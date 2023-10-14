const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const axios = require("axios"); // Import 'axios' instead of 'request'
const moment = require("moment");

const cors = require("cors");

const port = 8000;
const hostname = "localhost";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


const server = http.createServer(app);

// ACCESS TOKEN FUNCTION - Updated to use 'axios'
async function getAccessToken() {
  const consumer_key = "a96MleGfcNEebNcOjGZhcHkFkdmtutOz"; // REPLACE IT WITH YOUR CONSUMER KEY
  const consumer_secret = "AUzZiBGRQ6A1rVXp"; // REPLACE IT WITH YOUR CONSUMER SECRET
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth =
    "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error(error.message);
  }
}

app.get("/", (req, res) => {
  res.send("MPESA DARAJA API WITH NODE JS BY ALLAN KIPLAGAT");
  var timeStamp = moment().format("YYYYMMDDHHmmss");
  console.log(timeStamp);
});

//ACCESS TOKEN ROUTE
app.get("/access_token", (req, res) => {
  getAccessToken()
    .then((accessToken) => {
      res.send("😀 Your access token is " + accessToken);
    })
    .catch(console.err(err));
});

//MPESA STK PUSH ROUTE
app.get("/stkpush", (req, res) => {
  let phoneNumber=req.query.phoneNumber;
  const amount=req.query.amount;
  getAccessToken()
    .then((accessToken) => {
      const url =
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const auth = "Bearer " + accessToken;
      const timestamp = moment().format("YYYYMMDDHHmmss");
      const password = new Buffer.from(
        "174379" +
          "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
          timestamp
      ).toString("base64");

      axios
        .post(
          url,
          {
            BusinessShortCode: "174379",
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: "254710251692",
            PartyB: "174379",
            PhoneNumber: "phone", 
            CallBackURL: "https://mydomain.com/path",
            AccountReference: "ALUS PAY",
            TransactionDesc: "Mpesa Daraja API stk push test",
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((response) => {
          res.send(
            "😀 Request is successful done ✔✔. Please enter MPESA pin to complete the transaction"
          );
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("❌ Request failed");
        });
    })
    .catch(console.log);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
