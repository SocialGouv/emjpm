const express = require("express");
const router = express.Router();

const authHelpers = require("../auth/_helpers");
const passport = require("../auth/local");

router.post("/register", authHelpers.loginRedirect, (req, res, next) => {
    return authHelpers
        .createUser(req, res)
        .then(response => {
            passport.authenticate("local", (err, user, info) => {
                if (user) {
                    return handleResponse(res, 200, "success");
                }
            })(req, res, next);
        })
        .catch(err => {
            return handleResponse(res, 500, "error");
        });
});

router.post("/login", authHelpers.loginRedirect, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return handleResponse(res, 500, "error");
        }
        if (!user) {
            return handleResponse(res, 404, "User not found");
        }
        if (user) {
            req.logIn(user, function(err) {
                if (err) {
                    return handleResponse(res, 500, "error");
                }
                return handleResponse(res, 200, "success");
            });
        }
    })(req, res, next);
});

router.get("/logout", authHelpers.loginRequired, (req, res, next) => {
    //console.log(req)
    req.logout();
    //return
    handleResponse(res, 200, "success");
});

function handleLogin(req, user) {
    return new Promise((resolve, reject) => {
        req.login(user, err => {
            if (err) reject(err);
            resolve();
        });
    });
}

function handleResponse(res, code, statusMsg) {
    res.status(code).json({ status: statusMsg });
}

module.exports = router;
