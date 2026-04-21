const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 2000
        },
        {
            name: "laptop",
            price: 200000
        }
    ])
})

module.exports = router;