var express = require('express');
var router = express.Router();
var Vedio = require('../model/Vedio')
/*var monk = require('monk');
var db = monk('localhost:27017/movies1');*/

/*router.get('/',function(req,res){
	var collection = db.get('vedios');
	collection.find({},function(err,videos){
		if(err) throw err;
		res.json(videos);
	});
});
*/
router.get('/',function(req,res){

	Vedio.find({},function(err,docs){
		if (err) {
			console.log('failed');// statement
		}else{
			console.log(docs);
			res.json(docs);
		}
	});
});

router.post('/',function(req,res){
	var vedio = new Vedio();
	vedio.name = req.body.name;
	vedio.link = req.body.link;
	vedio.save(function(err){
		if(err) console.log(fail);
	});
});

router.get('/:id',function(req,res){
	Vedio.findOne({_id:req.$routeParams._id},function(err,docs){
		if (err) {
			console.log('failed');// statement
		}else{
			console.log(docs);
			res.json(docs);
		}
	});
});

router.put('/:id',function(req,res){
	var vedio = new Vedio();
	vedio.name = req.body.name;
	vedio.link = req.body.link;
	vedio.save(function(err){
		if(err) console.log(fail);
	});
});
	







module.exports = router;