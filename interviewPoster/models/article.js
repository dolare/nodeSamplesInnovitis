var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect('mongodb://localhost:27017/test1_1',function(err){
    if(err)console.log('连接mongodb失败');
});

autoIncrement.initialize(connection);

var ArticleSchema = new Schema({
	_id: {
        type: Number,
        unique: true
    },
    postDate: { type: Date, default: Date.now() },
    date:Date,
    position:String,
    company:String,
    description:String
});



var Article = mongoose.model("Aticle",ArticleSchema);

ArticleSchema.plugin(autoIncrement.plugin,{
    model:'Article',
    field:'_id',
    startAt:1,
    incrementBy:1
})

var article = new Article({});


article.save(function(err){
    if(err) console.log('save article failed');
})


module.exports = Article;