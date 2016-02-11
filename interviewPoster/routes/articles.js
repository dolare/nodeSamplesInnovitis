var express = require('express');
var router = express.Router();
var articles = require('../models/article')

/* GET home page. */


router.get('/',function(req,res){

	articles.find({},function(err,docs){
		if (err) {
			console.log('failed');// statement
		}else{
			console.log(docs);
			res.json(docs);
		}
	});
});


module.exports = router;
