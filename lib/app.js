var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost/BlogApp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE MODEL/CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "The Fox",
    image: "http://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/112012/fox_hound_special_forces_group.png?itok=utjhV04Y",
    body: "Foxhound Special Force Group"
});

app.get("/", function (req, res) {
    "use strict";
    res.redirect("/blogs");
});


//INDEX ROUTE
app.get("/blogs", function (req, res) {
    "use strict";
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//NEW ROUTE
app.get("/new", function (req, res) {
    "user strict";
    res.render("new");
});

app.listen("3000", function () {
    "use strict";
    console.log("Blog app running!");
});