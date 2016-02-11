var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/movies1');

var VedioSchema = new Schema({
	_id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    date: { type: Date, default: Date.now },
    name:  String,
    link:String,
	postDate:Date,
	image:String
});



var Vedio = mongoose.model("Vedio",VedioSchema);

/*var vedio = new Vedio({});
vedio.link = 'www';
vedio.name = 'log';*/

/*vedio.save(function(err){
    if(err) console.log('save failed');
})
*/
module.exports = Vedio;