const express = require("express");
const router = express.Router();
const axios = require("axios");
const parser = require("parse-address");
const { Office, User, sequelize } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!username || !password) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      username,
      password: encryptedUserPassword,
    });

    // Create token
    const token = jwt.sign(
      //FIXME: change username to userid
      { user_id: username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.put("/offices", async (req, res) => {
  const { title, description } = req.body;

  try {
    const office = await Office.findOne({ where: { title } });
    office.description = description;
    await office.save();
    res.status(200).send("Office successfully updated");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("All input is required");
  }
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    user.token = token;

    return res.status(200).json(user);
  }
  return res.status(400).send("Invalid Credentials");
});

router.post("/api", async ({ body: { address } }, res) => {
  const allOffices = await sequelize.sync().then(() => Office.findAll());

  const officeDescriptionMapping = allOffices.reduce(
    (mapping, { dataValues: { title, description } }) => ({
      ...mapping,
      [title]: description,
    }),
    {}
  );

  const encodedAddressSearchText = encodeURIComponent(address);

  const { data: rawGoogleCivicResponse } = await axios({
    url: `https://www.googleapis.com/civicinfo/v2/representatives?key=${process.env.GOOGLE_API_KEY}&address=${encodedAddressSearchText}`,
  });

  const { offices: officesWithoutDescription } = rawGoogleCivicResponse;

  const {
    city,
    number,
    prefix = "",
    street,
    type,
  } = parser.parseLocation(address);

  const params = new URLSearchParams({
    houseNumber: number,
    street: `${prefix}${street} ${type}`,
    borough: city.toLowerCase() === "new york" ? "Manhattan" : city,
  });

  const {
    data: { address: communityInfo },
  } = await axios({
    url: `https://api.nyc.gov/geo/geoclient/v1/address.json?houseNumber=${number}&street=${prefix}${street} ${type}&borough=${
      city.toLowerCase() === "new york" ? "Manhattan" : city
    }`,
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.OCP_KEY,
    },
  });

  res.json({
    googleCivicResponse: {
      ...rawGoogleCivicResponse,
      offices: officesWithoutDescription.map((office) => ({
        ...office,
        description: officeDescriptionMapping[office.name],
      })),
    },
    communityInfo,
  });
});

module.exports = router;
