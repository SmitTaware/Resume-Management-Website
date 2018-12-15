const express = require("express");
const router = express.Router();
const data = require("../data.rec");

router.get("/home", async (req, res) => {
    try{
       const  record = data.getAllRec(req.session.user._id);
       res.render("main/home", {rec:record});
    } catch (e) {
        res.status(500).send();
    }});