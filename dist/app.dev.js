"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var express = require("express");

var bodyParser = require("body-parser");

var cors = require("cors");

var axios = require("axios");

var path = require("path");

var fetch = require("node-fetch");

var request = require("request");

var app = express();
app.use(bodyParser.json());
var posts = "https://jsonplaceholder.typicode.com/posts?_limit=10";
var comments = "https://jsonplaceholder.typicode.com/comments?_limit=10";
app.use(cors());
app.get("/getPosts", function (req, res, next) {
  Promise.all([axios.get(posts), axios.get(comments)]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        pos = _ref2[0],
        com = _ref2[1];

    return res.json([pos.data, com.data]);
  })["catch"](function (err) {
    return console.log(err);
  });
});
app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "index.html"));
}); //

app.listen(3000, function () {
  console.log("Port 3000 RUNNING...");
});