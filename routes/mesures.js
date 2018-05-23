const express = require("express");

const router = express.Router();
const queries = require("../db/queries");
const fetch = require("isomorphic-fetch");

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


router.get("/popup", async (req, res, next) => {
    const ti = await queries.getTiByUserId(req.user.id);
    console.log("hello")
    console.log("ti",ti.id)
    console.log( queries
        .getAllMesuresByPopUp(ti.id)
        .then(function(mesures) {

            res.status(200).json(mesures);
        })
        .catch(function(error) {
            throw error;
            next(error);
        }))
    queries
        .getAllMesuresByPopUp(ti.id)
        .then(function(mesures) {

            res.status(200).json(mesures);
        })
        .catch(function(error) {
            throw error;
            next(error);
        });
});


router.get("/codePostal", async (req, res, next) => {
    url= "https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,centre,population&boost=population"
    fetch(url).then(response => response.json())
        .then(json => {
            json.map(code => (
                code.codesPostaux.map( codePos => (
                queries
                    .getPostecode(codePos,code.centre.coordinates[1],code.centre.coordinates[0])
                    .then(function(mesures) {
                        res.status(200).json(mesures);
                    })
                    .catch(function(error) {
                        throw error;
                        next(error);
                    })
                )))
            )
        });
});






module.exports = router;
