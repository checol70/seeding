//need to replace all the <name>s
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 8080;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "<name>_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.html page with the <name>s in it.
app.get("/", function(req, res) {
  connection.query("SELECT * FROM <name>s;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { <name>s: data });
  });
});

// Create a new <name>
app.post("/<name>s", function(req, res) {
  connection.query("INSERT INTO <name>s (<name>) VALUES (?)", [req.body.<name>], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new <name>
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Retrieve all <name>s
app.get("/<name>s", function(req, res) {
  connection.query("SELECT * FROM <name>s;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});

// Update a <name>
app.put("/<name>/:id", function(req, res) {
  connection.query("UPDATE <name>s SET <name> = ? WHERE id = ?", [req.body.<name>, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Delete a <name>
app.delete("/<name>s/:id", function(req, res) {
  connection.query("DELETE FROM <name>s WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
