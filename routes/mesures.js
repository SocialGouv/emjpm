const express = require("express");

const router = express.Router();
const queries = require("../db/queries");


router.get("/", async (req, res, next) => {
    const ti = await queries.getTiByUserId(req.user.id);
    queries
        .getAllMesuresByMandataires(ti.id)
        .then(function(mesures) {
            res.status(200).json(mesures);
        })
        .catch(function(error) {
            throw error;
            next(error);
        });
});



module.exports = router;
