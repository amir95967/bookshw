const express = require("express");
const { CakeModel, validateCake } = require("../models/cakeModel");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let data = await CakeModel.find({});
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.get("/category/:catName", async (req, res) => {
    try {
        const catName = req.params.catName;
        const data = await CakeModel.find({ category_id: catName });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occured while fetching cake entries by category." });
    }
});

router.post("/", async (req, res) => {
    let validBody = validateCake(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let cake = new CakeModel(req.body);
        await cake.save();
        res.status(201).json(cake);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occured while adding a new Cake entry." });
    }
});

router.put("/:id", async (req, res) => {
    let validBody = validateCake(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let id = req.params.id;
        let data = await CakeModel.updateOne({ _id: id }, req.body);
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
        let data = await CakeModel.deleteOne({ _id: id })
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

module.exports = router;