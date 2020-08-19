/**
 * Braden McCoy
 * 8/15/2019
 * 154AE
 * API for the "Giraffe Store" website which handles getting information on products and reviews
 * It has 7 endpoints which support retrieving all items, a specific item, searching for an items
 * retrieving reviews on an item, adding reviews and feedback to the server an purchasing an item.
 */

"use strict";
const express = require("express");
const mysql = require("promise-mysql");
const multer = require("multer");

const app = express();
app.use(express.static("public"));
app.use(multer().none());
app.use(express.json());

// Returns all items in stock
app.get("/giraffes/all", async function(req, res) {
  let query = "SELECT id, name, description FROM products WHERE stock > 0";
  let data;
  let db;
  try {
    db = await getDB();
    data = await db.query(query);
    db.end();
    res.json(data);
  } catch (err) {
    if (db) {
      db.end();
    }
    throw (err);
  }
});

// Retrieves information about a single item
app.get("/giraffes/:item", async function(req, res) {
  let item = req.params.item;
  item = item.replace("-", " ");
  let query = "SELECT * FROM products WHERE name = ?";
  let data;
  let db;
  try {
    db = await getDB();
    data = await db.query(query, [item]);
    db.end();
    res.json(data);
  } catch (err) {
    if (db) {
      db.end();
    }
    throw (err);
  }
});

// Returns an item based on the searched name
app.get("/giraffes/search/:name", async function(req, res) {
  let name = req.params.name;
  name = "%" + name + "%";

  let query = "SELECT * FROM products WHERE name LIKE ?";
  let data;
  let db;
  try {
    db = await getDB();
    data = await db.query(query, [name]);
    db.end();
    res.json(data);
  } catch (err) {
    if (db) {
      db.end();
    }
    throw (err);
  }
});

// Returns reviews on the given product name
app.get("/giraffes/reviews/:name", async function(req, res) {
  let name = req.params.name;
  name = name.replace("-", " ");
  let query = "SELECT name, review FROM reviews WHERE product = ?";
  let data;
  let db;
  try {
    db = await getDB();
    data = await db.query(query, [name]);
    db.end();
    res.json(data);
  } catch (err) {
    if (db) {
      db.end();
    }
    throw (err);
  }
});

// Adds a review to the server, the next page load will show the new review
app.post("/giraffes/add-review", async function(req, res) {
  let name = req.body.name;
  let product = req.body.product;
  let review = req.body.review;
  if (name && product && review) {
    let query = "INSERT INTO reviews(name, product, review) VALUES(?, ?, ?)";
    let db;
    let okPacket;
    try {
      db = await getDB();
      okPacket = await db.query(query, [name, product, review]);
      db.end();
      res.type("text");
      if (okPacket.affectedRows > 0) {
        res.send("Review added successfully.");
      } else {
        res.status(500).send("There was a problem adding your review, please try again later.");
      }
    } catch (err) {
      if (db) {
        db.end();
      }
      throw (err);
    }
  } else {
    res.status(400).send("Invalid Params");
  }
});

// Adds user feedback to the server, the next page load will show the new feedback
app.post("/giraffes/add-feedback", async function(req, res) {
  let name = req.body.name;
  let text = req.body.text;
  if (name && text) {
    let query = "INSERT INTO feedback(name, feedback_text) VALUES(?, ?)";
    let db;
    let okPacket;
    try {
      db = await getDB();
      okPacket = await db.query(query, [name, text]);
      db.end();
      res.type("text");
      if (okPacket.affectedRows > 0) {
        res.send("Thanks for your feedback!");
      } else {
        res.status(500).send("There was a problem storing your feedback, please try again later.");
      }
    } catch (err) {
      if (db) {
        db.end();
      }
      throw (err);
    }
  } else {
    res.status(400).send("Invalid Params");
  }
});

// Supports a purchase and decrements the stock of each item purchased.
app.post("/giraffes/purchase", async function(req, res) {
  let cart = JSON.parse(req.body.cart);
  let db;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i].name;
    if (!(cart[i].stock > 0)) {
      res.status(400).send("Item out of stock: " + item["name"]);
    } else {
      res.type("text");
      let query = "UPDATE products SET stock = stock - 1 WHERE name = ?";
      let okPacket;
      try {
        db = await getDB();
        okPacket = await db.query(query, [item]);
        db.end();
        res.type("text");
        if (okPacket.affectedRows > 0) {
          res.send("Purchase Successful");
        } else {
          res.status(500).send("There was a problem with your purchase, please try again later.");
        }
      } catch (err) {
        if (db) {
          db.end();
        }
        throw (err);
      }
    }
  }
});

/**
 * Establishes a database connection and returns the database object.
 * @returns {Object} - The database object for the connection.
 */
async function getDB() {
  let db = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "giraffedb"
  });
  return db;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
