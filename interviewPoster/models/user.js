var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/test1_0',function(err){
    if(err)console.log('连接mongodb失败');
});

var UserSchema = new Schema({
	_id: {
        type: Number,
        unique: true
    },
    createDate: { type: Date, default: Date.now },
    name:  String,
    email:String,
	phoneNumber:Date,
	password:String
});



var User = mongoose.model("User",UserSchema);


module.exports = User;