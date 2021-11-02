/**
 * This following code is a an express app to run the chatbot
 */
// Dependencies
const port = process.env.PORT || 8000;
const venom = require("venom-bot");
const express = require("express");
const path = require("path");
const app = express();
const { create_venom } = require("./chatbot/create_venom");
const { start } = require("./chatbot/start_chatbot");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));

//Listen on port 8000
const server = app.listen(port, function () {
    console.log(`Listening on port ${port}`);
    console.log(`http://localhost:${port}/`);
});

//Routes
app.get("/scan", async function (req, res) {
    res.render("chatbot.ejs", { name: "Manan" })
});

//Start the chatbot
create_venom(venom).then(async (bot) => {
    start(bot);
});


