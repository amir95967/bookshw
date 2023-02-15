const express = require("express");
const { CarModel } = require("../models/carModel")
const router = express.Router();

router.get("/", async (req, res) => {
    let perPage = 5;
    let page = req.query.page - 1 || 0;
    let sort = req.query.sort || "_id";
    let reverse = (req.query.reverse == "yes") ? 1 : - 1;
    try {
        let data = await CarModel
            .find({})
            .limit(perPage)
            .skip(page * perPage)
            .sort({ [sort]: reverse })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.get("/search", async (req, res) => {
    try {
        let search = req.query.s;
        let searchExp = new RegExp(search, 'i');
        let data = await CarModel
            .find({ $or: [{ car: searchExp }, { car_color: searchExp }] })
            .limit(20)
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

module.exports = router;
