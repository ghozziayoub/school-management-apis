const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({

    titre:{
        type: String,
        required: true,
        min:3,
        max:160, 
    },
    content:{
        type: String,
        required: true,
        min:200,
        max:2000000,
    },
    image:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        required: true
    },
    createdBy:{
        type: String,
        required: true
    }
    

},{timestamps:true});

const Article = mongoose.model("article", ArticleSchema);

module.exports = Article;