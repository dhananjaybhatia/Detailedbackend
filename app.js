import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import path from "path";
import jwt from "jsonwebtoken";

import User from "./models/user.js";

const app = express();
dotenv.config();

app.set("view engine", "ejs");
// Required middleware to parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public"))); // Use 'process.cwd()' for ES modules
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

//create and login
app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, Salt) => {
    bcrypt.hash(password, Salt, async (err, hash) => {
      let createdUser = await User.create({
        username: username,
        email: email,
        password: hash,
        age: age,
      });
      let token = jwt.sign({ email: email }, "secret");
      res.cookie("token", token);
      res.send(createdUser);
    });
  });
});

//login page
app.get("/login", (req, res) => {
  res.render("login");
});

//logging the user
app.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send("User not found"); // Respond if no user is found
    }

    // Compare the passwords if the user exists
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.send("Error occurred during password comparison");
      }

      if (result) {
        // If passwords match, proceed with the login (for example, render a dashboard or login page)
        res.send("Login successful");
      } else {
        // If passwords don't match
        res.send("Incorrect password");
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

//log-out
app.post("/logout", (req, res) => {
  res.cookie("token", ""); // remove the token is basically logging out.
  res.redirect("/");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Successfully running on port ${port}`);
});
