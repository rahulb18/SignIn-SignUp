const express = require("express");
const Router = express.Router();
const homeSchema = require("../models/homeSchema");

Router.get("/", (req, res) => {
  res.render("register");
});

Router.post("/register", async (req, res) => {
  try {
    const { email, password, cpassword } = req.body;

    const existingUser = await homeSchema.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    if (password === cpassword) {
      const userData = new homeSchema({
        email,
        password
      });
      
      const result = await userData.save();
      console.log("Success");

      res.redirect("/");
      
    } else {
      res.status(400).send("Password does not match");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Log in

Router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const result = await homeSchema.findOne({ email: email });
    // console.log(result, result.email);
    if (result && email === result.email && password === result.password) {
      res.render("../views/dashboard.ejs");
    } else {
      res.status(400).send("Wrong email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = Router;
