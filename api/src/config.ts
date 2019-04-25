require("dotenv").config({});

export default {
  auth: {
    secret: process.env.AUTH_SECRET || "pSgcpwDNAHLZTrxLTD8kcr7Q5q4"
  }
};
