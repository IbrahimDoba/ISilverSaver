
const router = require("express").Router();

router.get('/', (req, res) => {
    res.send({message:"get res here"})
} )

module.exports = router;