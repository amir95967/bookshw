const express = require("express");
const { bookModel, validateBook } = require("../models/bookModel");
const router = express.Router();

router.get("/", async (req, res) => {
    let perPage = 4;
    let page = req.query.page - 1 || 0;
    let sort = req.query.sort || "date_created";
    let reverse = (req.query.reverse == "yes") ? 1 : -1;
    try {
        let data = await bookModel
            .find({})
            .limit(perPage)
            .skip(page * perPage)
            .sort({ [sort]: reverse });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(502).json({ err });
    }
});

router.get("/search", async (req, res) => {
    try {
        let search = req.query.s;
        let searchExp = new RegExp(search, "i");
        let data = await bookModel.find({
            $or: [{ name: searchExp }, { info: searchExp }]
        }).limit(20);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(502).json({ err });
    }
});

router.post("/", async (req, res) => {
    let book = new bookModel({
        name: req.body.name,
        info: req.body.info
    });
    try {
        let savedBook = await book.save();
        res.json(savedBook);
    } catch (err) {
        console.log(err);
        res.status(502).json({ err });
    }
});

router.put("/:id", async (req, res) => {
    let validBody = validateBook(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let id = req.params.id;
        let data = await bookModel.updateOne({ _id: id }, req.body);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let data = await bookModel.deleteOne({ _id: id })
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

module.exports = router;