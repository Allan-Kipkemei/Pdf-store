const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const moment = require("moment");
const mongoose = require("mongoose");
const twilio = require("twilio");
const cors = require("cors");

const User = require("./models/models");
const { connectToDatabase } = require("./config/db");

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Connect to the database
connectToDatabase;

// Define Twilio credentials
const accountSid = "AC5165bd589aa3a1328f050d6b03567874";
const authToken = "87f8051e849f44a5894ca16aa5ab00b0";

// Initialize Twilio client
const twilioClient = twilio(accountSid, authToken);

// Get M-Pesa access token
async function getAccessToken() {
  const consumerKey = "2oI7PoalUzC4Dt5mbHYGnZMXcgYsyiOf"; // Replace with your consumer key
  const consumerSecret = "jmSpjCKrqPEQl350"; // Replace with your consumer secret

  const auth = `Basic ${Buffer.from(consumerKey + ":" + consumerSecret).toString("base64")}`;
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  try {
    const response = await axios.get(url, {
      headers: { Authorization: auth },
    });
    return response.data.access_token;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

// Send an image to WhatsApp
function sendImageToWhatsApp() {
  const from = "whatsapp:+14155238886";
  const to = "whatsapp:+254710251692";
  const imageUrl = "https://cdn.pixabay.com/photo/2023/08/08/09/20/wedding-8176868_640.jpg";

  return twilioClient.messages
    .create({
      from,
      to,
      body: "Here is your image",
      mediaUrl: imageUrl,
    })
    .then((message) => {
      console.log(`Message sent: ${message.sid}`);
    })
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
}

app.get("/", (req, res) => {
  res.send("MPESA DARAJA API WITH NODE JS BY ALLAN KIPLAGAT");
  const timeStamp = moment().format("YYYYMMDDHHmmss");
  console.log(timeStamp);
});

app.get("/access_token", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    res.send(`😀 Your access token is ${accessToken}`);
  } catch (error) {
    res.status(500).send(`❌ Error: ${error.message}`);
  }
});

app.get("/stkpush", async (req, res) => {
  try {
    const phoneNumber = req.query.phoneNumber;
    const amount = req.query.amount;
    const accessToken = await getAccessToken();

    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth = `Bearer ${accessToken}`;
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = new Buffer.from(
      "174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp
    ).toString("base64");

    const response = await axios.post(url, {
      BusinessShortCode: "174379",
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: "254710251692",
      PartyB: "174379",
      PhoneNumber: "254710251692",
      CallBackURL: "https://mydomain.com/path",
      AccountReference: "Alus Mabele",
      TransactionDesc: "Mpesa Daraja API stk push test",
    }, {
      headers: { Authorization: auth },
    });

    res.send("😀 Request is successful done ✔✔. Please enter MPESA pin to complete the transaction");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("❌ Request failed");
  }
});

app.post('/mpesa/callback', async (req, res) => {
  try {
    const transactionStatus = req.body.Body.stkcallback.ResultCode;
    if (transactionStatus === '0') {
      await sendImageToWhatsApp();
      res.status(200).send('Successful transaction');
    } else {
      console.log('Failed', req.body.Body.stkcallback.ResultDesc);
      res.status(400).send('❌ Transaction failed. Check the M-Pesa status.');
    }
  } catch (error) {
    console.error('❌ Error in processing M-Pesa callback:', error);
    res.status(500).send('❌ Internal Server Error. Contact support.');
  }
});

app.post("/UserData", async (req, res) => {
  try {
    const { name, phoneNumber, amount } = req.body;
    const timestamp = new Date();
    const newUser = new User({
      name,
      phoneNumber,
      amount,
      createdAt: timestamp,
    });
    await newUser.save();
    res.status(200).json({ message: "User data added successfully to the database" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error adding user data to the database" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
