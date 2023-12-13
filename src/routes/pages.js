const express = require('express');
const router = express.Router();
const dadosEmi = require('../api.json');


router.get('/', function(req,res){
    res.render("../src/pages/index");
});

router.get('/emitentes', function (req, res){
    res.json(dadosEmi);
});

module.exports = router;