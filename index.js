const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res, next) => {
  res.status(200).json({ message: "hello world" });
});

app.get("/province", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.rajaongkir.com/starter/province",
      {
        headers: { key: process.env.RO_KEY },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response.data.rajaongkir) {
      return res
        .status(error.response.data.rajaongkir.status.code)
        .json(error.response.data);
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/city", async (req, res, next) => {
  try {
    const { province } = req.query;
    const response = await axios.get(
      `https://api.rajaongkir.com/starter/city?province=${province}`,
      {
        headers: { key: process.env.RO_KEY },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response.data.rajaongkir) {
      return res
        .status(error.response.data.rajaongkir.status.code)
        .json(error.response.data);
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/cost", async (req, res, next) => {
  try {
    const payload = req.body;
    const response = await axios.post(
      `https://api.rajaongkir.com/starter/cost`,
      payload,
      {
        headers: { key: process.env.RO_KEY },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response.data.rajaongkir) {
      return res
        .status(error.response.data.rajaongkir.status.code)
        .json(error.response.data);
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use("*", async (req, res, next) => {
  return res.status(404).json({ message: "No route match" });
});

app.listen(PORT, () => console.log("Server ready"));
