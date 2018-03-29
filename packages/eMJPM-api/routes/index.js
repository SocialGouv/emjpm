var express = require('express');
var router = express.Router();
var queries = require('../db/queries');


/* GET home page. */



router.get('/mandataires', function(req, res, next) {
    queries.getAll()
        .then(function(mandataires) {
            res.status(200).json(mandataires);
        })
        .catch(function(error) {
            next(error);
        });
});
router.get('/mandataires/:id', function(req, res, next) {
    queries.getSingle(req.params.id)
        .then(function(mandataire) {
            res.status(200).json(mandataire);
        })
        .catch(function(error) {
            next(error);

        });

});

router.post('/mandataires', function(req, res, next) {
    queries.add(req.body)
        .then(function(mandataireID) {
            return queries.getSingle(mandataireID);
        })
        .then(function(mandataire) {
            res.status(200).json(mandataire);
        })
        .catch(function(error) {
            next(error);
        });
});

router.put('/mandataires/:id', function(req, res, next) {
    queries.update(req.params.id, req.body)
        .then(function() {
            return queries.getSingle(req.params.id);
        })
        .then(function(mandataire) {
            res.status(200).json(mandataire);
        })
        .catch(function(error) {
            next(error);
        });
});



router.get('/commentaires', function(req, res, next) {
    console.log(res)
    queries.getAllCommentaire()
        .then(function(commentaires) {
            res.status(200).json(commentaires);
        })
        .catch(function(error) {
            next(error);
        });
});
router.get('/commentaires/:id', function(req, res, next) {
    queries.getSingleCommentaire(req.params.id)
        .then(function(commentaire) {
            res.status(200).json(commentaire);
        })
        .catch(function(error) {
            next(error);

        });

});

router.post('/commentaires', function(req, res, next) {
    queries.addCommentaire(req.body)
        .then(function(commentaireID) {
            return queries.getSingle(commentaireID);
        })
        .then(function(commentaire) {
            res.status(200).json(commentaire);
        })
        .catch(function(error) {
            next(error);
        });
});

router.put('/commentaires/:id', function(req, res, next) {
    queries.updateCommentaire(req.params.id, req.body)
        .then(function() {
            return queries.getSingle(req.params.id);
        })
        .then(function(commentaire) {
            res.status(200).json(commentaire);
        })
        .catch(function(error) {
            next(error);
        });
});


router.get('/mesures', function(req, res, next) {
    console.log(res)
    queries.getAllCommentaire()
        .then(function(commentaires) {
            res.status(200).json(commentaires);
        })
        .catch(function(error) {
            next(error);
        });
});
router.get('/mesures/:id', function(req, res, next) {
    queries.getSingleCommentaire(req.params.id)
        .then(function(commentaire) {
            res.status(200).json(commentaire);
        })
        .catch(function(error) {
            next(error);

        });

});

router.post('/mesures', function(req, res, next) {
    queries.addCommentaire(req.body)
        .then(function(commentaireID) {
            return queries.getSingle(commentaireID);
        })
        .then(function(commentaire) {
            res.status(200).json(commentaire);
        })
        .catch(function(error) {
            next(error);
        });
});

router.put('/mesures/:id', function(req, res, next) {
    queries.updateCommentaire(req.params.id, req.body)
        .then(function() {
            return queries.getSingle(req.params.id);
        })
        .then(function(commentaire) {
            res.status(200).json(commentaire);
        })
        .catch(function(error) {
            next(error);
        });
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
