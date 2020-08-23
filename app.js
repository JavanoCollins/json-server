const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const axios = require("axios");
const path = require("path");
const fetch = require("node-fetch");
const request = require("request");

const app = express();
app.use(bodyParser.json());

let posts = "https://jsonplaceholder.typicode.com/posts?_limit=10";
let comments = "https://jsonplaceholder.typicode.com/comments?_limit=10";

app.use(cors());
app.get("/getPosts", (req, res, next) => {
    Promise
        .all([axios.get(posts), axios.get(comments)])
        .then(function ([pos, com]) {
            return res.json([pos.data, com.data])
        })
        .catch((err) => console.log(err));
});

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//
app.listen(3000, () => {
    console.log(`Port 3000 RUNNING...`);
});
