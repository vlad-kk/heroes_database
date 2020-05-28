const {Schema, model} = require('mongoose');

const schema = new Schema({
    "nickname": {type: String, required: true},
    "real_name": {type: String},
    "origin_description": {type: String},
    "superpowers": {type: String},
    "catch_phrase": {type: String},
    "images": {type:  [String]}
});

schema.pre('save', function (next) {
    let self = this;
    heroModel.find({nickname : self.nickname}, function (err, docs) {
        if (!docs.length){
            next();
        }else{
            console.log('Такой герой занят: ', self.nickname);
            next(new Error("User exists!"));
        }
    });
}) ;

const heroModel = model('Superhero', schema);
module.exports = heroModel;